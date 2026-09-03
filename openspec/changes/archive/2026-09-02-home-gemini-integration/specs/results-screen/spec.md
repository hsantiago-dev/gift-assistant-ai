## Purpose

Define o comportamento da tela de resultados (ResultsScreen) do Gift Assistant AI na fase mínima de integração: exibir as 5 sugestões de presentes retornadas pela Gemini em forma de texto, servindo de destino da navegação pós-geração na HomeScreen. Escopo restrito à primeira geração — sem carrossel e sem regeneração (fica para change futura).

## ADDED Requirements

### Requirement: Exibição das sugestões retornadas em texto
A ResultsScreen DEVE exibir as sugestões de presentes (lista tipada `GiftSuggestion[]` com `nome` e `justificativa`) recebidas da primeira geração da Gemini. Nesta fase, as sugestões DEVEM ser apresentadas em formato de texto (JSON), sem carrossel de cards nem interação de regeneração.

#### Scenario: Exibição das sugestões em texto
- **WHEN** a ResultsScreen é aberta com uma lista de sugestões retornadas pela Gemini
- **THEN** a tela exibe as sugestões em formato de texto (JSON), incluindo `nome` e `justificativa` de cada uma

#### Scenario: Aberta sem sugestões válidas
- **WHEN** a ResultsScreen é aberta sem uma lista válida de sugestões
- **THEN** a tela exibe um estado vazio com mensagem amigável indicando que não há sugestões para mostrar

### Requirement: Origem das sugestões via navegação
A ResultsScreen DEVE receber as sugestões via parâmetros de rota a partir da navegação disparada pela HomeScreen após uma geração bem-sucedida.

#### Scenario: Navegação com sugestões
- **WHEN** a HomeScreen navega para a ResultsScreen após a geração ser bem-sucedida
- **THEN** as sugestões retornadas são transmitidas e exibidas pela ResultsScreen
