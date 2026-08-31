# constants Specification

## Purpose

Estabelece as constantes de domínio do produto Gift Assistant AI — opções dos chips de filtro (orçamento e ocasião) e placeholders variáveis do campo de texto livre — consumidas pelas telas de entrada para manter dados e textos centralizados e consistentes.

## Requirements

### Requirement: Opções do chip de orçamento
A aplicação DEVE expor as opções de seleção única do chip de orçamento: `Até R$50`, `R$50–150`, `R$150–300` e `Sem limite`.

#### Scenario: Opções de orçamento disponíveis
- **WHEN** a tela de entrada renderiza o chip de orçamento
- **THEN** as quatro opções definidas (`Até R$50`, `R$50–150`, `R$150–300`, `Sem limite`) estão disponíveis para o usuário selecionar

### Requirement: Opções do chip de ocasião
A aplicação DEVE expor as opções de seleção única do chip de ocasião: `Aniversário`, `Natal`, `Namorados` e `Sem motivo especial`.

#### Scenario: Opções de ocasião disponíveis
- **WHEN** a tela de entrada renderiza o chip de ocasião
- **THEN** as quatro opções definidas (`Aniversário`, `Natal`, `Namorados`, `Sem motivo especial`) estão disponíveis para o usuário selecionar

### Requirement: Placeholders variáveis do campo de texto
A aplicação DEVE expor um conjunto de frases de placeholder de exemplo para o campo de texto livre, do qual uma é selecionada a cada abertura da tela, conforme RF02.

#### Scenario: Conjunto de placeholders disponível
- **WHEN** a tela de entrada é aberta
- **THEN** um placeholder é selecionado a partir do conjunto de frases pré-definidas (ex.: mencione a pessoa, idade/ocasião e um interesse específico) e exibido no campo de texto livre

#### Scenario: Placeholder varia entre aberturas
- **WHEN** a tela de entrada é aberta mais de uma vez
- **THEN** o placeholder exibido pode ser diferente do da abertura anterior (selecionado entre as opções definidas)
