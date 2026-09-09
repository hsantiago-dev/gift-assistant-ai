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
A HomeScreen DEVE exibir um botão primário "Gerar sugestões", habilitado quando o campo de texto contém texto não vazio e a tela não está em estado de loading, e desabilitado (com aparência consistente) caso contrário. Ao ser pressionado com o botão habilitado, a HomeScreen DEVE disparar a chamada à Gemini (primeira geração) a partir do texto livre e dos chips opcionais, exibir feedback de loading durante a chamada e, em caso de sucesso, navegar para a ResultsScreen com as sugestões retornadas.

#### Scenario: Botão habilitado com texto preenchido
- **WHEN** o campo de texto contém texto não vazio e não há chamada em andamento
- **THEN** o botão "Gerar sugestões" está habilitado

#### Scenario: Botão desabilitado sem texto
- **WHEN** o campo de texto está vazio
- **THEN** o botão "Gerar sugestões" está desabilitado

#### Scenario: Disparo da chamada à Gemini
- **WHEN** o usuário pressiona "Gerar sugestões" com o botão habilitado
- **THEN** a HomeScreen dispara a chamada de primeira geração à Gemini com o texto livre e os chips de orçamento/ocasião selecionados

#### Scenario: Navegação para os resultados em caso de sucesso
- **WHEN** a chamada à Gemini retorna sucesso
- **THEN** a HomeScreen navega para a ResultsScreen transmitindo as sugestões retornadas (5 itens)

### Requirement: Estado de loading da geração
Durante a chamada à Gemini, a HomeScreen DEVE exibir um estado de carregamento completo alinhado ao protótipo Candy (via Moti): um círculo com ícone de presente pulsando, um título "Pensando em ideias para você...", uma descrição curta e três indicadores pontuais pulsantes em sequência. O botão "Gerar sugestões" DEVE permanecer desabilitado enquanto a chamada está em andamento para evitar disparos duplicados.

#### Scenario: Loading exibido durante a chamada
- **WHEN** a HomeScreen dispara a chamada à Gemini e aguarda a resposta
- **THEN** a tela exibe o estado de carregamento completo (círculo pulsante com ícone de presente, título, descrição e três dots pulsantes) e o botão "Gerar sugestões" permanece desabilitado

#### Scenario: Loading encerrado ao fim da chamada
- **WHEN** a chamada à Gemini termina (com sucesso ou erro)
- **THEN** o feedback de carregamento desaparece e o estado da tela reflete o resultado

### Requirement: Tratamento de erro com "Tentar novamente"
Quando a chamada à Gemini falha (erro de rede, timeout ou erro da API), a HomeScreen DEVE exibir um estado de erro visual com ícone, título "Ops, não consegui gerar sugestões agora.", mensagem amigável e um botão "Tentar novamente" explícito. Erros de requisição são tratados como recuperáveis.

#### Scenario: Erro exibido com "Tentar novamente"
- **WHEN** a chamada à Gemini falha por rede, timeout ou erro da API
- **THEN** a HomeScreen exibe o estado de erro (ícone, título, mensagem amigável) e um botão "Tentar novamente"

#### Scenario: Tentar novamente re-dispara a chamada
- **WHEN** o usuário pressiona "Tentar novamente" após uma falha
- **THEN** a HomeScreen dispara novamente a chamada à Gemini com a mesma entrada

### Requirement: Estado local da entrada
A HomeScreen DEVE manter em estado local o texto livre, o orçamento selecionado e a ocasião selecionada, permitindo que o usuário edite e alterne esses valores livremente.

#### Scenario: Edição livre dos valores
- **WHEN** o usuário altera o texto ou seleciona/desseleciona chips
- **THEN** o estado local é atualizado e a tela reflete a nova entrada

### Requirement: Apresentação visual da HomeScreen
A HomeScreen DEVE seguir a linguagem visual do protótipo: cabeçalho com título "Para quem é o presente?" e subtítulo, campo de texto com placeholder variável dentro de card, chips selecionados com preenchimento Primary e chips não selecionados com fundo claro e borda, e botão "Gerar sugestões" com ícone e preenchimento Primary.

#### Scenario: Cabeçalho da Home
- **WHEN** a HomeScreen está aberta
- **THEN** o cabeçalho exibe o título "Para quem é o presente?" e o subtítulo descrevendo que o app ajuda a encontrar algo especial

#### Scenario: Chips não selecionados com borda
- **WHEN** um chip de Orçamento ou Ocasião não está selecionado
- **THEN** o chip é exibido com fundo claro e borda visível, diferenciando-se do estado selecionado (preenchimento Primary)

#### Scenario: Botão com ícone
- **WHEN** a HomeScreen exibe o botão "Gerar sugestões"
- **THEN** o botão é mostrado com preenchimento Primary, sombra tingida e um ícone de destaque ("criação") antes do rótulo