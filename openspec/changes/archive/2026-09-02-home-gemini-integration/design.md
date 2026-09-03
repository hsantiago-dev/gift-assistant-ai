## Context

A `HomeScreen` (`src/app/index.tsx`) já coleta texto + chips, e o serviço `src/services/gemini.ts` já expõe `generateSuggestion(input): Promise<GiftSuggestion[]>` com erros tipados (`GiftAIError`). Nenhum dos dois está conectado: o handler `handleGenerate` é vazio. A stack usa expo-router (rota `index` registrada em `src/app/_layout.tsx`), Moti para animações, e o design system "Candy" (ver proposal.md — Why, e specs — home-screen / results-screen).

## Goals / Non-Goals

**Goals:**
- Disparar a primeira geração da Gemini a partir do botão da HomeScreen e navegar para a ResultsScreen com as sugestões.
- Adicionar estados de **loading** (feedback Moti) e **erro** com "Tentar novamente" que não consome tentativa (RF07/RF08).
- Criar uma `ResultsScreen` mínima que exibe as sugestões em texto (JSON).

**Non-Goals:**
- Implementar carrossel de cards, regeneração/repetição ou contador de tentativas — ficam para a change futura do fluxo completo de resultados.
- Implementar "Limpar" (reset) — fica para a change futura de resultados.
- Alterar o serviço `gemini` (prompts 6.3/6.4, parsing) nem constantes de domínio.

## Decisions

### 1. Quem chama o serviço: a HomeScreen (não um hook novo)
Colocar a chamada a `generateSuggestion` diretamente em `handleGenerate` na HomeScreen, com estados locais `loading` e `error`. Enquanto a mudança é pequena e single-screen, um hook `useSuggestion` só adicionaria indireção.
- *Alternativa considerada:* criar `src/hooks/use-generate.ts` — à vista, adiável até a change de regeneração; manter simples agora.

### 2. Estados de UI na HomeScreen
Três estados: `idle`/`loading`/`error` (via booleans `loading`, `errorMessage`). Durante `loading`, o botão fica desabilitado e um indicador Moti é exibido; em `error`, mostra-se mensagem amigável + botão "Tentar novamente". `errorMessage` é limpo ao iniciar nova chamada.
- *Alternativa considerada:* enum de estado — mais robusto, porém desnecessário para dois flags neste escopo.

### 3. Feedback de loading via Moti
Usar um pequeno indicador animado (ex.: ActivityIndicator dentro de um `MotiView` com `AnimatePresence`) alinhado ao "Candy". O `PrimaryButton` já tem animação de press; o loading substitui temporariamente a label ou adiciona spinner ao lado.
- *Alternativa considerada:* apenas `ActivityIndicator` de RN — funciona, mas sem o polish Moti exigido pelo design system.

### 4. Navegação expo-router + transmissão das sugestões
Registrar a rota `results` em `src/app/_layout.tsx` dentro do `<Stack>`. A HomeScreen navega com `router.push({ pathname: '/results', params })`. Para transmitir `GiftSuggestion[]`, **serializar em JSON** num único param de rota (`suggestions`) e fazer `JSON.parse` na ResultsScreen — params de rota são strings. (Alternativa: estado global/contexto — mais infraestrutura; JSON em param é suficiente e típico para expo-router.)
- *Alternativa considerada:* índice na tela, estado global via React Context — sobre-engenharia para duas telas; o param JSON resolve.
- *Risco:* parametrização de URL pode ter limite de tamanho — aceitável para ~5 sugestões curtas; se entrar carrossel no futuro, migrar para armazenamento em contexto/estado.

### 5. Tratamento de erro pelo código do `GiftAIError`
Usar `error instanceof GiftAIError` ou seu `.code` para distinguir falhas de requisição (rede/timeout/API) — que **não consomem tentativa** e oferecem "Tentar novamente" — de falhas de configuração (ex.: `MISSING_API_KEY`), exibindo mensagem apropriada em cada caso. A spec marca que erros de requisição são recuperáveis (não consomem tentativa).
- *Alternativa considerada:* tratar erro genérico igual para todos — perde a semântica tipada que o serviço já fornece.

### 6. ResultsScreen mínima (texto JSON)
Criar `src/app/results.tsx` que lê `suggestions` do param de rota, faz `JSON.parse`, e renderiza o JSON (via `JSON.stringify(suggestions, null, 2)`) em um bloco de texto monoespaçado, seguindo o tema "Candy". Sem carrossel/regeneração nesta change.

## Risks / Trade-offs

- [Param de rota com JSON pode ficar grande ou quebrar em navegação profunda] → mantido pequeno (5 sugestões curtas); migrar para contexto/estado na change de carrossel se necessário.
- [Falha de `JSON.parse` ao ler param na ResultsScreen (param ausente/corrompido)] → a tela trata parse inválido com estado vazio amigável (spec: "Aberta sem sugestões válidas").
- [Loading/erro duplicando chamada se o usuário puder disparar duas vezes] → botão desabilitado durante `loading` impede disparo duplicado.
- [Chamada sem `GEMINI_API_KEY` configurada] → o serviço já lança `GiftAIError` (`MISSING_API_KEY`) claro; a HomeScreen exibe a mensagem de erro.

## Migration Plan

- Registrar rota `results` no Stack e criar `src/app/results.tsx`.
- Ligar estados de loading/erro e a chamada em `src/app/index.tsx`.
- Reversão trivial: nenhuma dependência nova, `results` desregistrada e handler restaurado ao estado vazio não altera o serviço nem constantes.
