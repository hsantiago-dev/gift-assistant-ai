# home-screen Specification

## Purpose

Define o comportamento da tela de entrada do Gift Assistant AI (HomeScreen): captura do texto livre do presente, seleção única opcional de orçamento e ocasião, e o botão "Gerar sugestões" — na fase sem integração com a API Gemini.

## Requirements

### Requirement: Campo de texto livre com placeholder variável
A HomeScreen DEVE exibir um campo de texto livre para o usuário descrever o presente desejado, cujo placeholder é selecionado aleatoriamente a partir do conjunto `Placeholders` a cada abertura da tela.

#### Scenario: Placeholder selecionado na abertura
- **WHEN** a HomeScreen é aberta
- **THEN** o campo de texto exibe um placeholder selecionado do conjunto `Placeholders` (ex.: menção à pessoa, idade/ocasião e um interesse específico)

#### Scenario: Placeholder varia entre aberturas
- **WHEN** a HomeScreen é aberta mais de uma vez
- **THEN** o placeholder exibido pode ser diferente do da abertura anterior

#### Scenario: Usuário digita texto
- **WHEN** o usuário digita no campo de texto
- **THEN** o texto digitado substitui o placeholder e é mantido no estado local da tela

### Requirement: Chips de seleção única para orçamento
A HomeScreen DEVE exibir um grupo de chips de seleção única para orçamento, com as opções `BudgetOptions` (`Até R$50`, `R$50–150`, `R$150–300`, `Sem limite`). Apenas um chip pode estar selecionado por vez, e a seleção é opcional.

#### Scenario: Selecionar um orçamento
- **WHEN** o usuário seleciona uma opção de orçamento
- **THEN** apenas essa opção fica selecionada no grupo

#### Scenario: Trocar o orçamento selecionado
- **WHEN** o usuário seleciona uma segunda opção de orçamento
- **THEN** a seleção anterior é desmarcada e a nova fica selecionada

#### Scenario: Desselecionar o orçamento
- **WHEN** o usuário toca novamente na opção de orçamento já selecionada
- **THEN** a opção é desselecionada, ficando o grupo sem seleção

### Requirement: Chips de seleção única para ocasião
A HomeScreen DEVE exibir um grupo de chips de seleção única para ocasião, com as opções `OccasionOptions` (`Aniversário`, `Natal`, `Namorados`, `Sem motivo especial`). Apenas um chip pode estar selecionado por vez, e a seleção é opcional.

#### Scenario: Selecionar uma ocasião
- **WHEN** o usuário seleciona uma opção de ocasião
- **THEN** apenas essa opção fica selecionada no grupo

#### Scenario: Trocar a ocasião selecionada
- **WHEN** o usuário seleciona uma segunda opção de ocasião
- **THEN** a seleção anterior é desmarcada e a nova fica selecionada

#### Scenario: Desselecionar a ocasião
- **WHEN** o usuário toca novamente na opção de ocasião já selecionada
- **THEN** a opção é desselecionada, ficando o grupo sem seleção

### Requirement: Botão "Gerar sugestões"
A HomeScreen DEVE exibir um botão primário "Gerar sugestões", habilitado apenas quando o campo de texto contém texto não vazio e desabilitado (com aparência consistente) caso contrário. Nesta fase, o botão não dispara chamada de API.

#### Scenario: Botão habilitado com texto preenchido
- **WHEN** o campo de texto contém texto não vazio
- **THEN** o botão "Gerar sugestões" está habilitado

#### Scenario: Botão desabilitado sem texto
- **WHEN** o campo de texto está vazio
- **THEN** o botão "Gerar sugestões" está desabilitado

#### Scenario: Botão sem ação de API
- **WHEN** o usuário pressiona "Gerar sugestões" com o botão habilitado
- **THEN** nenhuma requisição de rede é realizada e nenhum estado de resultados é apresentado

### Requirement: Estado local da entrada
A HomeScreen DEVE manter em estado local o texto livre, o orçamento selecionado e a ocasião selecionada, permitindo que o usuário edite e alterne esses valores livremente.

#### Scenario: Edição livre dos valores
- **WHEN** o usuário altera o texto ou seleciona/desseleciona chips
- **THEN** o estado local é atualizado e a tela reflete a nova entrada
