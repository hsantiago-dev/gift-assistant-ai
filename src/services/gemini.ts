import { GoogleGenAI } from '@google/genai';

const GEMINI_MODEL = 'gemini-3.6-flash';
const EXPECTED_SUGGESTION_COUNT = 5;

export type GiftSuggestion = {
  nome: string;
  justificativa: string;
};

export type GenerateSuggestionInput = {
  text: string;
  budget?: string;
  occasion?: string;
};

export class GiftAIError extends Error {
  constructor(
    message: string,
    readonly code: 'MISSING_API_KEY' | 'REQUEST' | 'PARSE' | 'VALIDATION',
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = 'GiftAIError';
  }
}

let genai: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  if (genai) {
    return genai;
  }

  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new GiftAIError(
      'EXPO_PUBLIC_GEMINI_API_KEY não está definida. Configure a chave no arquivo .env (veja .env.example).',
      'MISSING_API_KEY',
    );
  }

  genai = new GoogleGenAI({ apiKey });
  return genai;
}

function buildFirstGenPrompt(input: GenerateSuggestionInput): string {
  const budget = input.budget?.trim() || 'não informado';
  const occasion = input.occasion?.trim() || 'não informada';

  return (
    `Texto do usuário: "${input.text.trim()}"\n` +
    `Orçamento: ${budget}\n` +
    `Ocasião: ${occasion}\n\n` +
    `Com base nisso, sugira ${EXPECTED_SUGGESTION_COUNT} ideias de presente. Se faltar informação ` +
    `importante (como interesses da pessoa), use sugestões mais versáteis, mas seja específico sempre que possível.\n` +
    `Responda APENAS em JSON, sem texto adicional:\n` +
    `[{"nome": "", "justificativa": ""}]`
  );
}

function extractJsonText(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  return (fenced ? fenced[1] : text).trim();
}

function parseAndValidate(rawText: string): GiftSuggestion[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(extractJsonText(rawText));
  } catch {
    throw new GiftAIError(
      'Não foi possível interpretar a resposta da IA como JSON.',
      'PARSE',
    );
  }

  if (!Array.isArray(parsed)) {
    throw new GiftAIError(
      'A resposta da IA não é um array de sugestões.',
      'VALIDATION',
    );
  }

  for (const item of parsed) {
    const valid =
      !!item &&
      typeof item === 'object' &&
      typeof (item as GiftSuggestion).nome === 'string' &&
      (item as GiftSuggestion).nome.trim() !== '' &&
      typeof (item as GiftSuggestion).justificativa === 'string' &&
      (item as GiftSuggestion).justificativa.trim() !== '';
    if (!valid) {
      throw new GiftAIError(
        'A resposta da IA contém sugestões com campos nome/justificativa ausentes ou vazios.',
        'VALIDATION',
      );
    }
  }

  if (parsed.length !== EXPECTED_SUGGESTION_COUNT) {
    throw new GiftAIError(
      `A resposta da IA deveria conter ${EXPECTED_SUGGESTION_COUNT} sugestões, mas contém ${parsed.length}.`,
      'VALIDATION',
    );
  }

  return parsed as GiftSuggestion[];
}

export async function generateSuggestion(
  input: GenerateSuggestionInput,
): Promise<GiftSuggestion[]> {
  const client = getGenAI();
  const prompt = buildFirstGenPrompt(input);

  let rawText: string;
  try {
    const response = await client.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    rawText = response.text ?? '';
  } catch (error) {
    throw new GiftAIError(
      `Falha ao chamar a API Gemini: ${error instanceof Error ? error.message : String(error)}`,
      'REQUEST',
      { cause: error },
    );
  }

  return parseAndValidate(rawText);
}
