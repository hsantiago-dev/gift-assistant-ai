# Gift Assistant AI — Instruções para agentes

## Referências obrigatórias

- Ler as docs versionadas do **Expo SDK 57** antes de escrever qualquer código:
  https://docs.expo.dev/versions/v57.0.0/
- Especificação funcional: `docs/OVERVIEW.md`
- Design system: `docs/DESIGN.md`
- Protótipos de referência (HTML): `docs/PROTOTYPE.md`

## Visão do produto

App que recebe texto livre do usuário + 2 chips opcionais (orçamento e ocasião),
envia à API Gemini e exibe 5 sugestões de presentes personalizadas com
justificativa, em carrossel de cards. Fluxo: **entrada → IA → resposta JSON**.
Se o usuário não gostar, pode regenerar (sem repetir itens) até 3 vezes por busca.

## Stack

- Expo SDK ~57 + React Native 0.86 + React 19 + TypeScript
- Roteamento: **expo-router** (arquivos em `src/app/`)
- Animações: **Moti** (sobre react-native-reanimated) — loading, entrada de cards, transições do carrossel
- IA: SDK oficial **`@google/genai`** — NUNCA usar o antigo `@google/generative-ai` (descontinuado)
- Chamadas à IA via cliente HTTP embutido no SDK (sem Axios/fetch manual)

## Estrutura (adaptada ao expo-router)

```
src/app/index.tsx       → HomeScreen (texto livre, chips, botão "Gerar sugestões")
src/app/results.tsx     → ResultsScreen (carrossel/card único, contador, "Gerar novamente", "Limpar", estados de loading/erro)
src/services/gemini.ts  → montagem dos prompts (6.3/6.4 do OVERVIEW) + chamada à API
src/constants/          → tema Candy, opções dos chips, placeholders variáveis
src/components/         → componentes reutilizáveis (Card, Chip, indicadores...)
src/hooks/              → hooks compartilhados
```

## Regras de negócio (não negociáveis)

1. A IA deve responder **APENAS JSON**: `[{"nome": "", "justificativa": ""}]` — sempre 5 sugestões
2. Máx. **3 regenerações** por busca; ao atingir 0, desabilitar o botão com mensagem amigável
3. Erro de requisição (rede/timeout/API) **NÃO consome** tentativa — oferece "Tentar novamente"
4. Regeneração reenvia o prompt original + lista de itens já sugeridos, instruindo a não repetir
5. Exibir contagem restante ao usuário ("2 tentativas restantes")
6. "Limpar" reseta texto, chips, resultados e contador de regenerações
7. Placeholder do campo de texto **varia a cada abertura** da tela (frases em `constants`)
8. Chips são de seleção única e opcionais; sem eles, a IA trabalha só com o texto livre

## Design system "Candy"

- Cores: Primary `#e040a0` · Secondary `#7c52aa` · Tertiary `#0096cc` · Background `#fef7ff`
- Fonte **DM Sans** (bold para headings, medium para labels)
- Botões/chips/badges em formato **pill** (radius full); cards com radius 16–20px
- Sombras **tingidas** com a cor do elemento (~15–20% opacidade), nunca cinza puro
- Microinterações **bouncy/spring** via Moti (scale leve, ease-out) — nada rígido
- Tokens completos: `docs/DESIGN.md`; referência visual das 2 telas + estados: `docs/PROTOTYPE.md`
- Feedback visual obrigatório para: carregando, erro e limite de regenerações atingido

## Segurança

- `GEMINI_API_KEY` apenas em `.env` (fora do git); nunca hardcoded no código
- Prompts canônicos definidos nas seções 6.3/6.4 de `docs/OVERVIEW.md` — só alterar se necessário
