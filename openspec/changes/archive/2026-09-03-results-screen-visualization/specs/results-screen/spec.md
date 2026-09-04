## MODIFIED Requirements

### Requirement: Exibição visual das sugestões em carrossel ou card único
A ResultsScreen DEVE exibir as sugestões de presentes (lista tipada `GiftSuggestion[]` com `nome` e `justificativa`) recebidas da Gemini em formato de carrossel de cards (quando houver mais de 1 sugestão) ou card único centralizado (quando houver apenas 1 sugestão), utilizando o design system "Candy" e animações suaves via Moti.

#### Scenario: Exibição em carrossel de cards
- **WHEN** a ResultsScreen é aberta com mais de 1 sugestão de presente
- **THEN** a tela exibe um carrossel de cards estilizados com nome, justificativa e indicador de slide

#### Scenario: Exibição em card único
- **WHEN** a ResultsScreen é aberta com exatamente 1 sugestão de presente
- **THEN** a tela exibe um card único centralizado com nome e justificativa

#### Scenario: Carrossel ocupando o espaço vertical disponível
- **WHEN** a ResultsScreen exibe as sugestões
- **THEN** o carrossel ocupa o espaço vertical disponível entre o título e o rodapé fixo

#### Scenario: Aberta sem sugestões válidas
- **WHEN** a ResultsScreen é aberta sem uma lista válida de sugestões
- **THEN** a tela exibe um estado vazio com mensagem amigável indicando que não há sugestões para mostrar

### Requirement: Origem das sugestões via navegação
A ResultsScreen DEVE receber as sugestões via parâmetros de rota a partir da navegação disparada pela HomeScreen após uma geração bem-sucedida.

#### Scenario: Navegação com sugestões
- **WHEN** a HomeScreen navega para a ResultsScreen após a geração ser bem-sucedida
- **THEN** as sugestões retornadas são transmitidas e exibidas pela ResultsScreen

## ADDED Requirements

### Requirement: Botão de ação fixo no rodapé
A ResultsScreen DEVE exibir o botão "Voltar" em um rodapé fixo ao fim da tela, sempre visível independentemente da rolagem do conteúdo.

#### Scenario: Botão fixo no rodapé
- **WHEN** a ResultsScreen está aberta e o usuário rola o conteúdo
- **THEN** o botão "Voltar" permanece fixo no fim da tela
