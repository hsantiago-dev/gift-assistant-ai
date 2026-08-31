# design-system Specification

## Purpose

Define os tokens e convenções visuais do design system "Candy" — cores, tipografia, raio, espaçamento e sombras — que padronizam a aparência de todas as telas do Gift Assistant AI, garantindo consistência visual entre HomeScreen e ResultsScreen e futuras evoluções.

## Requirements

### Requirement: Paleta de cores Candy
A aplicação DEVE expor uma paleta de cores com os seguintes tokens primários: Primary `#e040a0` (ações primárias/identidade), Secondary `#7c52aa` (elementos secundários/etiquetas), Tertiary `#0096cc` (informacional/links/destaques) e Background `#fef7ff` (fundo). A paleta DEVE incluir variantes de estado necessárias (ex.: erro/aviso) e cores derivadas para sombras tingidas.

#### Scenario: Tokens de cores disponíveis
- **WHEN** o tema é carregado no app
- **THEN** os tokens Primary, Secondary, Tertiary e Background estão disponíveis com os valores definidos acima

#### Scenario: Uso tipográfico das cores
- **WHEN** um elemento estiliza botões, tags ou destaques
- **THEN** ele utiliza os tokens da paleta Candy em vez de cores avulsas hardcoded

### Requirement: Tipografia DM Sans
A aplicação DEVE carregar e expor a fonte DM Sans com pesos definidos: bold para títulos (headings) e medium para rótulos (labels), com tamanho base maior (16px no corpo) e line-height generoso.

#### Scenario: Fonte carregada
- **WHEN** o app inicializa a folha de estilos
- **THEN** a fonte DM Sans está registrada e aplicada, com os pesos bold e medium mapeados para títulos e rótulos

### Requirement: Raio de borda (pill e cards)
A aplicação DEVE expor tokens de raio de borda: raio completo (pill/full) para botões, chips, badges e inputs; e raio de 16–20px para cards. Nenhum elemento deve usar cantos totalmente retos.

#### Scenario: Botões e chips em formato pill
- **WHEN** um botão, chip, badge ou input é renderizado
- **THEN** ele usa raio de borda completo (pill)

#### Scenario: Cards com raio arredondado
- **WHEN** um card é renderizado
- **THEN** ele usa raio de borda entre 16 e 20px

### Requirement: Espaçamento escalonado
A aplicação DEVE expor uma escala de espaçamento consistente (half, one, two, three, four, five, six) para uso em telas e componentes, garantindo ritmo visual uniforme.

#### Scenario: Escala de espaçamento disponível
- **WHEN** um componente define paddings ou gaps
- **THEN** ele utiliza valores da escala de espaçamento definida em vez de números arbitrários

### Requirement: Sombras tingidas
A aplicação DEVE aplicar sombras tingidas com a cor do próprio elemento, em opacidade de 15–20%, em vez de sombras cinza puro.

#### Scenario: Sombra de botão primário
- **WHEN** um botão primário rosa é renderizado
- **THEN** sua sombra utiliza uma cor derivada do Primary `#e040a0` em ~15–20% de opacidade

#### Scenario: Sombra de card
- **WHEN** um card branco é renderizado
- **THEN** sua sombra utiliza uma cor tingida (não cinza puro) em ~15–20% de opacidade

### Requirement: Base de animações (Moti)
A aplicação DEVE dispor de uma base configurada para microinterações via Moti, com suporte a transições bouncy/spring e ease-out, a ser consumida pelas telas (loading, entrada de cards, troca no carrossel).

#### Scenario: Dependência e configuração disponíveis
- **WHEN** uma tela importa a biblioteca de animação
- **THEN** a base de animações (Moti) está instalada e pronta para uso com curvas bouncy/ease-out
