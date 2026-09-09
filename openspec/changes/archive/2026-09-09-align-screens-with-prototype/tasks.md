## 1. Fundação: ícones e tokens do design system

- [x] 1.1 Instalar `@expo/vector-icons` via `npx expo install @expo/vector-icons` e confirmar que a dependência aparece em `package.json` e que `npx expo install --check` não acusa incompatibilidade
- [x] 1.2 Criar wrapper `src/components/ui/gift-icon.tsx` com mapa nome→glifo MCI (`gift`, `cash-multiple`, `calendar`, `creation`, `gift-outline`, `package-variant`, `refresh`, `close`, `heart`) e cor a partir de `useTheme()`, e verificar que renderiza nos 3 targets (web/android/ios) sem erro
- [x] 1.3 Adicionar tokens em `src/constants/colors.ts`: `error`/`error-container` e `surfaceCard` no tema light/dark, e verificar que `useTheme()` os expõe
- [x] 1.4 Adicionar em `src/constants/typography.ts` o estilo `body-lg` (18/28, `DMSans.medium`) e em `src/constants/spacing.ts` o token `sectionGap: 40`, e verificar que são consumíveis via `@/constants/theme`

## 2. HomeScreen alinhada ao protótipo

- [x] 2.1 Alterar copy do cabeçalho para "Para quem é o presente?" + subtítulo, centralizando os textos em `src/constants/`, e verificar que ambos aparecem com a tipografia correta (título 28/36 bold Primary, subtítulo `body-lg` 18/28)
- [x] 2.2 Envolver o TextInput em card de superfície clara com `tintedShadow`, fill `backgroundElement`, radius 16 e borda que fica Primary no foco (estado `focused`), e verificar o comportamento de foco em web e android
- [x] 2.3 Renderizar Orçamento e Ocasião em cards de superfície clara com cabeçalho ícone+label (pagamento/calendar) e `sectionGap` entre seções, e verificar o layout em mobile
- [x] 2.4 Ajustar `Chip` (via `chip.tsx`): pad 20×10, não selecionado = fundo claro + borda 1.5px `outline-variant`, selecionado = Primary; verificar os dois estados e que a desseleção continua funcionando
- [x] 2.5 Adicionar ícone no `PrimaryButton` ("Gerar sugestões" com `creation`) e aumentar padding/fonte do botão, e verificar que mantém a animação spring e a sombra tingida
- [x] 2.6 Substituir o spinner do rodapé por estado de loading completo (círculo 128 pulsante + ícone `gift-outline` + título "Pensando em ideias para você..." + descrição + 3 dots pulsantes via loop Moti), e verificar que desaparece ao fim da chamada
- [x] 2.7 Implementar estado de erro visual (composição de círculos + ícone `package-variant` + título "Ops, não consegui gerar sugestões agora." + mensagem + botão "Tentar novamente" com `refresh`), e verificar que o retry re-dispara a chamada com a mesma entrada

## 3. ResultsScreen alinhada ao protótipo

- [x] 3.1 Alterar cabeçalho para "Ideias Perfeitas" + subtítulo em Secondary (`body-lg`), centralizando a copy em `src/constants/`, e verificar que aparece com a tipografia/cores corretas
- [x] 3.2 Ajustar `gift-card.tsx`: fill `surfaceCard`, gap interno 16, mantendo badge numerado, stagger de entrada e sombra tingida; verificar cards alinhados (altura uniforme preservada)
- [x] 3.3 Confirmar manutenção do indicador pill expansível (dot ativo 24px, inativo 8px) e do snap do carrossel, e verificar a troca de slide em web e android

## 4. Docs e validação final

- [x] 4.1 Corrigir em `AGENTS.md` e `README.md` as referências `docs/` → `.docs/`, e verificar que os links resolvem para os arquivos existentes
- [x] 4.2 Rodar `npm run lint` e `npx tsc --noEmit` sem erros
- [x] 4.3 Validar o change com `openspec validate --change align-screens-with-prototype`