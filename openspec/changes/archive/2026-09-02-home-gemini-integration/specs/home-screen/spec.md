## MODIFIED Requirements

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

## ADDED Requirements

### Requirement: Estado de loading da geração
Durante a chamada à Gemini, a HomeScreen DEVE exibir feedback visual de carregamento (via Moti, conforme o design system "Candy") e desabilitar o botão "Gerar sugestões" para evitar disparos duplicados enquanto a chamada está em andamento.

#### Scenario: Loading exibido durante a chamada
- **WHEN** a HomeScreen dispara a chamada à Gemini e aguarda a resposta
- **THEN** a tela exibe feedback visual de carregamento e o botão "Gerar sugestões" permanece desabilitado

#### Scenario: Loading encerrado ao fim da chamada
- **WHEN** a chamada à Gemini termina (com sucesso ou erro)
- **THEN** o feedback de carregamento desaparece e o estado da tela reflete o resultado

### Requirement: Tratamento de erro com "Tentar novamente"
Quando a chamada à Gemini falha (erro de rede, timeout ou erro da API), a HomeScreen DEVE exibir uma mensagem de erro amigável com um botão "Tentar novamente". Essa falha NÃO deve consumir tentativa de regeneração, pois erros de requisição são tratados como recuperáveis.

#### Scenario: Erro exibido com "Tentar novamente"
- **WHEN** a chamada à Gemini falha por rede, timeout ou erro da API
- **THEN** a HomeScreen exibe mensagem de erro amigável e um botão "Tentar novamente"

#### Scenario: Tentar novamente re-dispara a chamada
- **WHEN** o usuário pressiona "Tentar novamente" após uma falha
- **THEN** a HomeScreen dispara novamente a chamada à Gemini com a mesma entrada, sem consumir tentativa de regeneração
