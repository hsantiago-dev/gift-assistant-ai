## MODIFIED Requirements

### Requirement: Exibição visual das sugestões em carrossel ou card único
A ResultsScreen DEVE exibir as sugestões de presentes (lista tipada `GiftSuggestion[]` com `nome` e `justificativa`) recebidas da Gemini em formato de carrossel de cards (quando houver mais de 1 sugestão) ou card único centralizado (quando houver apenas 1 sugestão), utilizando o design system "Candy" e animações suaves via Moti. Cada card DEVE apresentar um badge numerado indicando a posição da sugestão, o nome e a justificativa, com gap interno de 16px. O indicador de slide DEVE manter o dot ativo expandido em formato pill via animação Moti.

#### Scenario: Exibição em carrossel de cards
- **WHEN** a ResultsScreen é aberta com mais de 1 sugestão de presente
- **THEN** a tela exibe um carrossel de cards estilizados com badge numerado, nome, justificativa e indicador de slide com dot ativo em pill expansível

#### Scenario: Exibição em card único
- **WHEN** a ResultsScreen é aberta com exatamente 1 sugestão de presente
- **THEN** a tela exibe um card único centralizado com badge numerado, nome e justificativa

#### Scenario: Carrossel ocupando o espaço vertical disponível
- **WHEN** a ResultsScreen exibe as sugestões
- **THEN** o carrossel ocupa o espaço vertical disponível entre o título e o rodapé fixo

#### Scenario: Aberta sem sugestões válidas
- **WHEN** a ResultsScreen é aberta sem uma lista válida de sugestões
- **THEN** a tela exibe um estado vazio com mensagem amigável indicando que não há sugestões para mostrar

## ADDED Requirements

### Requirement: Cabeçalho da ResultsScreen
A ResultsScreen DEVE exibir o cabeçalho "Ideias Perfeitas" com um subtítulo na cor Secondary descrevendo que as sugestões foram pensadas com base nas respostas do usuário.

#### Scenario: Cabeçalho com título e subtítulo
- **WHEN** a ResultsScreen é aberta com sugestões válidas
- **THEN** o cabeçalho exibe o título "Ideias Perfeitas" e um subtítulo na cor Secondary