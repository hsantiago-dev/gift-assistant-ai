## 1. ResultsScreen mínima e rota

- [x] 1.1 Criar `src/app/results.tsx` (ResultsScreen) que lê o parâmetro de rota `suggestions` (JSON de `GiftSuggestion[]`), faz `JSON.parse` e exibe as sugestões em formato de texto (`JSON.stringify(suggestions, null, 2)`) seguindo o tema "Candy"; verificar que a tela renderiza o JSON corretamente com sugestões válidas
- [x] 1.2 Registrar a rota `results` no `<Stack>` de `src/app/_layout.tsx` como `Stack.Screen name="results"`; verificar que a rota resolve e é navegável
- [x] 1.3 Tratar na ResultsScreen o caso de parâmetro `suggestions` ausente ou `JSON.parse` inválido, exibindo um estado vazio com mensagem amigável (spec "Aberta sem sugestões válidas"); verificar que a tela não quebra nesse caso

## 2. Integração da HomeScreen com a Gemini

- [x] 2.1 Implementar o estado local `loading` (boolean) e `errorMessage` (string | null) na HomeScreen; verificar que refletem corretamente o início e o fim de uma chamada
- [x] 2.2 Implementar `handleGenerate` na HomeScreen chamando `generateSuggestion({ text, budget, occasion })` a partir dos estados atuais, limpando `errorMessage` ao iniciar e definindo `loading` como `true`; verificar que a chamada usa a entrada corrente da tela
- [x] 2.3 Em caso de sucesso, navegar para a rota `results` transmitindo as sugestões serializadas em JSON (`router.push({ pathname: '/results', params: { suggestions: JSON.stringify(suggestions) } })`); verificar que a navegação entrega as sugestões à ResultsScreen
- [x] 2.4 Em caso de erro, definir `errorMessage` e exibir mensagem amigável com botão "Tentar novamente" que re-dispara a mesma chamada **sem consumir tentativa** de regeneração (rede/timeout/API tratados como recuperáveis — RF07/RF08); verificar que o erro não decrementa contador de tentativa (ainda não há contador) e que o "Tentar novamente" refaz a chamada

## 3. Estados de loading e erro na UI

- [x] 3.1 Durante `loading`, desabilitar o botão "Gerar sugestões" (impedir disparo duplicado) e exibir feedback visual de loading via Moti alinhado ao design system "Candy"; verificar que o botão fica indisponível e o indicador aparece enquanto a chamada ocorre
- [x] 3.2 Ao terminar a chamada (sucesso ou erro), remover o feedback de loading e restaurar o botão conforme o estado (habilitado quando há texto e sem chamada em andamento); verificar que a UI reflete o estado final

## 4. Verificação de integração

- [x] 4.1 Rodar `npm run lint` e `npx tsc --noEmit` e verificar que passam sem erros
- [x] 4.2 Realizar teste manual do fluxo completo: com a `GEMINI_API_KEY` do `.env`, preencher texto + chips na HomeScreen, pressionar "Gerar sugestões", confirmar o loading, e navegar para a ResultsScreen exibindo o JSON retornado (5 sugestões); também simular erro (ex.: sem rede) e confirmar que "Tentar novamente" re-dispara sem consumir tentativa
- [x] 4.3 Apresentar ao usuário o **resultado obtido** no teste manual — o JSON retornado exibido na ResultsScreen e/ou a resposta real da API — e aguardar validação antes de encerrar
