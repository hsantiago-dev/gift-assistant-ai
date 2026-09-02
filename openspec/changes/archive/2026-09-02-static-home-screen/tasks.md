## 1. Componentes reutilizáveis

- [x] 1.1 Criar `src/components/chip.tsx` (Chip de seleção única, formato pill, com estados selecionado/desselecionado usando tokens Candy) e verificar que o componente é importável e compila (typecheck)
- [x] 1.2 Criar `src/components/chip-group.tsx` (grupo de chips com seleção única opcional) e verificar que permite selecionar, trocar e desselecionar ao re-tocar
- [x] 1.3 Criar `src/components/primary-button.tsx` (botão primário pill com sombra tingida e microinteração bouncy leve via Moti scale) e verificar que a prop `disabled` controla habilitado/estilo

## 2. HomeScreen estática

- [x] 2.1 Reescrever `src/app/index.tsx` como formulário de entrada (campo de texto livre + grupos de chips de orçamento e ocasião + botão "Gerar sugestões"), removendo o template "Welcome to Expo" e seus imports não usados, e verificar que o app compila (tsc --noEmit)
- [x] 2.2 Implementar placeholder variável selecionado aleatoriamente do conjunto `Placeholders` a cada abertura da tela e verificar que o campo exibe um placeholder do conjunto (rundo abrir a tela duas vezes pode variar)
- [x] 2.3 Implementar estado local `text`/`budget`/`occasion` com `useState` e verificar que editar texto e tocar nos chips atualiza a tela
- [x] 2.4 Conectar os chips de orçamento (`BudgetOptions`) e ocasião (`OccasionOptions`) ao estado local com seleção única e desseleção ao re-tocar, e verificar que apenas um chip fica selecionado por grupo
- [x] 2.5 Habilitar o botão "Gerar sugestões" apenas quando o texto não vazio, e deixar o handler sem chamada de rede nesta fase; verificar que o botão desabilita com texto vazio e que pressionar não dispara requisição

## 3. Aplicação do design system Candy

- [x] 3.1 Estilizar a tela com os tokens Candy (cores, tipografia DM Sans, spacing, radius pill/cards, sombras tingidas) de `src/constants/theme.ts` e verificar que nenhuma cor/sombra hardcoded fora dos tokens é introduzida
- [x] 3.2 Aplicar microinterações bouncy/spring via Moti em chips e botão e verificar que as animações rodam sem erro de runtime

## 4. Verificação de integração

- [x] 4.1 Rodar `npm run lint` e `npx tsc --noEmit` e verificar que passam sem erros
- [x] 4.2 Iniciar o app (`npx expo start`) e verificar que a HomeScreen renderiza o formulário de entrada com o tema Candy, sem regressão no boot
