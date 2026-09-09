## Purpose

Define a camada de ícones Candy cross-platform: um wrapper que renderiza os glifos usados pelo protótipo (Material Symbols) de forma consistente em iOS, Android e web, com cor e tamanho derivados dos tokens do tema.

## ADDED Requirements

### Requirement: Wrapper de ícone cross-platform
A aplicação DEVE dispor de um componente de ícone que renderize glifos nos targets iOS, Android e web a partir de um mesmo nome de glifo, sem quebra de layout nem fallback visual em qualquer plataforma.

#### Scenario: Renderização em todas as plataformas
- **WHEN** um componente de tela renderiza um ícone
- **THEN** o glifo é exibido com o mesmo resultado visual em iOS, Android e web

### Requirement: Mapa de glifos do protótipo
A aplicação DEVE expor o conjunto de glifos usados pelas telas, mapeados a partir dos Material Symbols do protótipo: `gift` (presente), `cash-multiple` (orçamento), `calendar` (ocasião), `creation` (gerar sugestões), `gift-outline` (loading), `package-variant` (erro), `refresh` (tentar novamente), `close` (decorativo de erro) e `heart` (favoritar).

#### Scenario: Glifos disponíveis
- **WHEN** uma tela referencia um dos glifos do mapa
- **THEN** o wrapper resolve para o glifo correto sem configuração adicional

### Requirement: Ícones seguem os tokens do tema
Os ícones DEVEM ser tintados pela cor do token do tema recebido (ex.: Primary, Secondary, textSecondary), sem cores avulsas hardcoded fora do tema.

#### Scenario: Cor por token
- **WHEN** um componente passa um token de cor Candy para o ícone
- **THEN** o ícone renderiza nessa cor e reflete o tema ativo (light/dark)