## Context

O produto exige chamadas à Gemini, mas hoje não há nenhuma integração: a HomeScreen estática (change `static-home-screen`) apenas coleta entrada. A stack define o SDK oficial `@google/genai` (nunca `@google/generative-ai`) com o cliente HTTP embutido, e a chave `GEMINI_API_KEY` só em `.env` (fora do git). O fluxo alvo é "entrada → IA → resposta JSON", com regenerações futuras reutilizando o mesmo serviço. Ver proposal.md — Why.

## Goals / Non-Goals

**Goals:**
- Criar `src/services/gemini.ts` como único ponto de contato com a IA, encapsulando setup do SDK, prompt, chamada, parse e validação.
- Expor uma função única e tipada que a ResultsScreen consumirá, com modelo de retorno (`GiftSuggestion[]`) e erros tipados.
- Isolar a lógica para teste manual independente com a key do `.env`.

**Non-Goals:**
- Implementar a ResultsScreen, navegação ou estado de regeneração — o serviço só expõe `generateSuggestion` (primeira geração).
- Alterar constantes de domínio (`options`, `placeholders`, `theme`) ou specs existentes.
- Implementar o prompt de regeneração (seção 6.4) — fica para uma change futura que acople exclusions.

## Decisions

### 1. Instância única do SDK (`GoogleGenAI`)
Criar a instância `new GoogleGenAI({ apiKey })` uma única vez no módulo (nível de módulo, lazy), lendo a chave de `process.env.GEMINI_API_KEY`. **Decisão:** instância única evita re-init e é o padrão do SDK.
- *Alternativa considerada:* instanciar por chamada — desnecessária e custosa; único centavo.

### 2. Validação de chave na inicialização
Se `GEMINI_API_KEY` não estiver definida, lançar erro claro de configuração na inicialização. **Decisão:** falhar cedo e de forma tipada (implementado como `MissingApiKeyError` ou verificação que lança `Error` descritivo), antes de qualquer chamada — evita runtime confuso.
- *Alternativa considerada:* deixar o SDK lançar genérico — pior DX para quem configurar mal.

### 3. Prompt de primeira geração como função pura
Montar o prompt (seção 6.3 do OVERVIEW) numa função pura `buildFirstGenPrompt(input, budget?, occasion?)`, injetando o texto livre e os filtros opcionais como contexto, com a instrução canônica de resposta JSON (`[{"nome","justificativa"}]`, 5 itens). **Decisão:** prompt separado da chamada facilita teste e reuso.
- *Alternativa considerada:* prompt inline na chamada — acopla geração e envio, dificulta testar isoladamente.

### 4. Modelo e geração via SDK
Usar `genai.models.generateContent` com um modelo gemini (ex.: `gemini-2.0-flash` ou variante estável disponível no SDK 57 — decidir na implementação consultando as docs SDK 57). **Decisão:** `generateContent` retorna o texto que alimenta o parse; usar o cliente HTTP embutido, sem fetch/Axios manual (regra da stack).
- *Alternativa considerada:* abordagem não estruturada/diferente do SDK — descartada; a stack manda usar o SDK.

### 5. Parse + validação estritos
Extrair o texto da resposta (ex.: `response.text`), fazer parsing JSON e validar contra um guard de tipo: exatamente 5 itens, cada um com `nome`/`justificativa` strings não vazias. Falhas lançam erros tipados (`GeminiParseError`, `GeminiValidationError`). **Decisão:** validação estrita garante o contrato "sempre 5 sugestões" exigido pelo produto.
- *Alternativa considerada:* confiar cegamente no JSON — arriscado; modelos podem devolver código-fence/markdown ou itens incompletos.

### 6. Modelo de dados tipado
Exportar `type GiftSuggestion = { nome: string; justificativa: string }` e `type GenerateSuggestionInput = { text: string; budget?: string; occasion?: string }`. A função exposta: `generateSuggestion(input): Promise<GiftSuggestion[]>` lançando `GiftAIError` tipado em falhas. **Decisão:** contrato explícito que a UI e testes usam.
- *Alternativa considerada:* `any` — contrário ao TypeScript strict e ao requisito de tipagem da especificação.

### 7. Setup de env
Adicionar `@google/genai` às `dependencies` do `package.json`; criar `.env` (fora do git) e `.env.example` (com `GEMINI_API_KEY=`), e garantir `.env` no `.gitignore`. **Decisão:** chave nunca hardcoded (regra de segurança).
- *Alternativa considerada:* hardcode — proibido pelas regras de negócio/segurança.

## Risks / Trade-offs

- [Versão/nome do modelo pode mudar entre SDKs] → consultar as docs SDK 57 na implementação e parametrizar o modelo como constante para ajuste pontual.
- [Modelo pode retornar JSON com código-fence (```json) ou markdown, quebrando o parsing] → o parse tenta extrair/limpar o bloco JSON antes do `JSON.parse`, além da validação estrita.
- [`process.env` em RN/Expo precisa de configuração de env] → expor via `expo-constants`/auto-linking de `.env` conforme docs Expo; garantir que `.env.example` documente a key.
- [Sem chamada real no CI/testes, a cobertura depende de mocks] → manter `buildFirstGenPrompt` pura para testar o prompt isoladamente e usar um cliente injetável/abstração leve para simular a resposta.

## Migration Plan

- Adicionar dependência `@google/genai`; criar `.env`/`.env.example`; ajustar `.gitignore`.
- Criar `src/services/gemini.ts` com as funções; verificar com `tsc --noEmit` e `eslint`.
- Nenhuma mudança de UI ou de dados persistidos — reversão é remover/desacoplar o serviço sem efeitos colaterais em telas (ainda não consumido).

## Open Questions

- Nome exato do modelo Gemini a usar (ex.: `gemini-2.0-flash`) depende da disponibilidade nas docs SDK 57 — decidir na implementação consultando a doc versionada; não altera spec nem arquitetura.
- Mecanismo de leitura de `.env` (built-in Expo vs lib) — detalhe de implementação conforme docs; não altera spec.
