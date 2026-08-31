## 1. Dependências e fontes

- [x] 1.1 Instalar `moti` via `npx expo install moti` e verificar que a versão compatível com Reanimated 4.x foi adicionada ao `package.json` sem conflito
- [x] 1.2 Registrar a fonte DM Sans via `expo-font` (no `_layout.tsx`, usando `useFonts` + `expo-splash-screen` para segurar o render) e verificar que o app inicia sem flash de fonte e a DM Sans fica disponível nos pesos bold/medium

## 2. Tokens do tema Candy

- [x] 2.1 Estruturar `src/constants/` em módulos temáticos (ex.: `colors.ts`, `spacing.ts`, `radius.ts`, `shadows.ts`, `typography.ts`) com um `index.ts` de agregação, e verificar que os módulos compilam (typecheck)
- [x] 2.2 Definir a paleta Candy em `colors.ts` (Primary `#e040a0`, Secondary `#7c52aa`, Tertiary `#0096cc`, Background `#fef7ff` + variantes de estado/sombras) e verificar os valores no arquivo
- [x] 2.3 Definir escala de espaçamento (half..six) e raios (pill/full e 16–20px) e verificar os tokens exportados
- [x] 2.4 Implementar derivadores de sombra tingida (cor do elemento a 15–20% de opacidade) e verificar que a sombra de um botão primário usa uma cor derivada do rosa `#e040a0`
- [x] 2.5 Atualizar os imports/uso do `theme.ts` existente (mantendo `Colors`, `Spacing`, `MaxContentWidth` consumíveis por `index.tsx`, `themed-view.tsx`, `app-tabs.tsx`) e verificar que o app compila e renderiza sem regressão

## 3. Constantes de domínio

- [x] 3.1 Criar `src/constants/options.ts` com as opções de orçamento (`Até R$50`, `R$50–150`, `R$150–300`, `Sem limite`) e ocasião (`Aniversário`, `Natal`, `Namorados`, `Sem motivo especial`) e verificar que as 8 opções existem nos dois grupos
- [x] 3.2 Criar `src/constants/placeholders.ts` com o conjunto de frases variáveis (RF02, seção 6.2 do OVERVIEW) e verificar que o conjunto tem múltiplas frases e segue o padrão pessoa/ocasião/interesse

## 4. Verificação de integração

- [x] 4.1 Rodar `npm run lint` e `npx tsc --noEmit` e verificar que passam sem erros
- [x] 4.2 Iniciar o app (`npx expo start`) e verificar que as telas existentes ainda renderizam com o tema Candy aplicado e que a base de animações Moti está importável sem erro de runtime
