## Why

A `HomeScreen` (change `static-home-screen`) coleta texto e chips, e o serviço `gemini` (change `add-gemini-service`) já encapsula a chamada de primeira geração — mas nenhum dos dois está conectado. O botão "Gerar sugestões" ainda não dispara rede nem navega. Esta change fecha o fluxo mínimo "entrada → IA → resposta JSON": o botão chama a Gemini, exibe os estados de loading/erro e navega para uma `ResultsScreen` simples que mostra o JSON retornado.

## What Changes

- Conectar o botão "Gerar sugestões" da `HomeScreen` ao serviço `generateSuggestion` (`src/services/gemini.ts`), disparando a chamada à IA a partir do texto livre + chips de orçamento/ocasião (esta change toca apenas a **primeira geração**, não regeneração).
- Adicionar **estado de loading** na `HomeScreen` com feedback visual (Moti) durante a chamada, desabilitando o botão e evitando disparos duplicados.
- Adicionar **tratamento de erro** na `HomeScreen`: exibir mensagem com botão "Tentar novamente" que **não consome tentativa** de regeneração (rede/timeout/API são tratados como erro não consumível — RF07/RF08).
- Criar `src/app/results.tsx` (`ResultsScreen`) que recebe as sugestões e exibe o **JSON retornado em texto** (escopo mínimo desta change, sem carrossel/regeneração); registrar a rota no Stack em `src/app/_layout.tsx`.
- Navegar da `HomeScreen` para a `ResultsScreen` em caso de sucesso, transmitindo as sugestões retornadas.
- **Sem** alterar constantes, prompts canônicos (6.3/6.4) nem o serviço `gemini`.

## Capabilities

### New Capabilities
- `results-screen`: tela que exibe o resultado da primeira geração da Gemini. Escopo desta change: apresentar as sugestões retornadas em texto (JSON), servindo como destino da navegação pós-sucesso — sem carrossel, sem regeneração (fica para change futura).

### Modified Capabilities
- `home-screen`: o botão "Gerar sugestões" passa a disparar a chamada à Gemini com estados de loading e erro ("Tentar novamente" sem consumir tentativa) e a navegar para a `ResultsScreen` em caso de sucesso — altera a requirement "Botão 'Gerar sugestões'" (antes "sem ação de API").

## Impact

- **Código:** alterações em `src/app/index.tsx` (estado de loading/erro + chamada + navegação) e `src/app/_layout.tsx` (registro da rota `results`); criação de `src/app/results.tsx`.
- **Navegação:** introduz a segunda tela (`results`) via expo-router Stack; transmissão de dados da Home para Results via parâmetros de rota.
- **Dependências:** reutiliza o serviço já existente `src/services/gemini.ts` (`generateSuggestion`). Pode adicionar componente/hook de loading se necessário (Moti já disponível). Sem novas libs externas.
- **Segurança:** nenhum impacto — `GEMINI_API_KEY` continua apenas em `.env`.
- **Risco baixo:** escopo deliberadamente pequeno; delegação de carrossel/regeneração/"Limpar" para changes futuras.
