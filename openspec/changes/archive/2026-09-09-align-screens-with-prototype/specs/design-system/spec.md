## MODIFIED Requirements

### Requirement: Paleta de cores Candy
A aplicação DEVE expor uma paleta de cores com os seguintes tokens primários: Primary `#e040a0` (ações primárias/identidade), Secondary `#7c52aa` (elementos secundários/etiquetas), Tertiary `#0096cc` (informacional/links/destaques) e Background `#fef7ff` (fundo). A paleta DEVE incluir variantes de estado necessárias (erro/aviso) e cores derivadas para sombras tingidas. A aplicação DEVE expor tokens de erro: `error` (`#e53e3e`) e `error-container` (`#ffe8e8`), usados nos estados de falha das telas.

#### Scenario: Tokens de cores disponíveis
- **WHEN** o tema é carregado no app
- **THEN** os tokens Primary, Secondary, Tertiary e Background estão disponíveis com os valores definidos acima

#### Scenario: Uso tipográfico das cores
- **WHEN** um elemento estiliza botões, tags ou destaques
- **THEN** ele utiliza os tokens da paleta Candy em vez de cores avulsas hardcoded

#### Scenario: Tokens de erro disponíveis
- **WHEN** uma tela exibe um estado de erro
- **THEN** os tokens `error` e `error-container` estão disponíveis e são usados para ícone, texto e fundos de erro

### Requirement: Tipografia DM Sans
A aplicação DEVE carregar e expor a fonte DM Sans com pesos definidos: bold para títulos (headings) e medium para rótulos (labels), com tamanho base maior (16px no corpo) e line-height generoso. A tipografia DEVE incluir o estilo `body-lg` (18px/28px, peso medium 500) para subtítulos e descrições de seção.

#### Scenario: Fonte carregada
- **WHEN** o app inicializa a folha de estilos
- **THEN** a fonte DM Sans está registrada e aplicada, com os pesos bold e medium mapeados para títulos e rótulos

#### Scenario: Subtítulos em body-lg
- **WHEN** uma tela exibe o subtítulo de uma seção
- **THEN** o texto usa o estilo `body-lg` (18px/28px, medium)

### Requirement: Espaçamento escalonado
A aplicação DEVE expor uma escala de espaçamento consistente (half, one, two, three, four, five, six) para uso em telas e componentes, garantindo ritmo visual uniforme. A escala DEVE incluir um token de espaçamento de seção (`section-gap`, 40px) para separar as seções principais de uma tela.

#### Scenario: Escala de espaçamento disponível
- **WHEN** um componente define paddings ou gaps
- **THEN** ele utiliza valores da escala de espaçamento definida em vez de números arbitrários

#### Scenario: Espaçamento de seção disponível
- **WHEN** uma tela separa seções principais (ex.: cabeçalho, campo de texto, chips)
- **THEN** o token `section-gap` (40px) está disponível para ser usado nessa separação

## ADDED Requirements

### Requirement: Cards de superfície para entradas
A aplicação DEVE apresentar o campo de texto e os grupos de chips (Orçamento e Ocasião) da HomeScreen dentro de cards de superfície clara com sombra tingida, cada grupo de chips com um cabeçalho composto por ícone e rótulo.

#### Scenario: Campo de texto em card
- **WHEN** a HomeScreen exibe o campo de texto
- **THEN** o campo está contido em um card de superfície clara com sombra tingida e ganha destaque na borda na cor Primary quando focado

#### Scenario: Grupos de chips em cards com cabeçalho
- **WHEN** a HomeScreen exibe Orçamento e Ocasião
- **THEN** cada grupo aparece em um card de superfície clara com sombra tingida e cabeçalho com ícone (pagamento para Orçamento, evento para Ocasião) e rótulo