## Why

A `HomeScreen` estática (change `static-home-screen`) já captura texto + chips, mas o produto ainda não chama a Gemini: o coração do fluxo "entrada → IA → resposta JSON" está vazio. Este serviço é o único ponto de contato com a IA e precisa existir isolado e testável antes de a ResultsScreen consumi-lo.

## What Changes

- Criar `src/services/gemini.ts` com setup do SDK oficial **`@google/genai`** (NUNCA o antigo `@google/generative-ai`), lendo a chave de `GEMINI_API_KEY` de `.env` (fora do git, nunca hardcoded).
- Adicionar `@google/genai` como dependência e `.env` + `.env.example` (com `.env` no `.gitignore`).
- Implementar o **prompt de primeira geração** (seção 6.3 de `docs/OVERVIEW.md`): texto livre + orçamento/ocasião opcionais → instrução para responder **APENAS JSON** `[{"nome": "", "justificativa": ""}]`.
- Montar a chamada à API via **cliente HTTP embutido no SDK** (sem Axios/fetch manual), com parsing e **tipagem estrita** da resposta JSON (sempre 5 sugestões).
- Exportar uma função de serviço tipada (ex.: `generateSuggestion`) que encapsula prompt + chamada + parse, pronta para a ResultsScreen consumir.
- **Sem** mudanças de UI, navegação, estado de regeneração ou constantes — escopo restrito ao serviço.

## Capabilities

### New Capabilities
- `gemini`: serviço de IA do Gift Assistant AI — inicialização do SDK `@google/genai` com a chave de `.env`, montagem do prompt de primeira geração (RF06/6.3 do OVERVIEW) a partir de texto livre e chips opcionais de orçamento/ocasião, chamada ao modelo e parse/validação da resposta JSON (`[{"nome","justificativa"}]`, sempre 5 itens). Define o contrato (assinatura tipada e modelo de retorno) que a ResultsScreen consumirá.

### Modified Capabilities
<!-- Nenhuma requirement de spec existente muda; `gemini` é uma capability nova. -->

## Impact

- **Código:** criação de `src/services/gemini.ts`; dependência nova `@google/genai`; `.env`/`.env.example` e ajuste de `.gitignore`.
- **Dependências:** adiciona `@google/genai`. Reutiliza constantes de `src/constants/options.ts` (BudgetOptions/OccasionOptions) e `src/constants/theme.ts` apenas se necessário para validação; o escopo é de serviço puro.
- **Config/Segurança:** exigência de `GEMINI_API_KEY` em `.env`; nunca hardcoded.
- **Risco médio:** introduz o primeiro consumo real de API; isolado em serviço para teste independente com a key do `.env`, sem tocar UI.
- **Artefatos de referência:** seção 6.3 e RF06 de `docs/OVERVIEW.md`; prontos de prompt no `docs/OVERVIEW.md`.
