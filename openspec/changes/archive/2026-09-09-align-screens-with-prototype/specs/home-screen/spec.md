## MODIFIED Requirements

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

## ADDED Requirements

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