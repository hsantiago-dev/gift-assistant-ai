# gemini Specification

## Purpose

Define o serviço de IA do Gift Assistant AI: a interface única que inicializa o SDK Gemini, monta o prompt de primeira geração a partir da entrada do usuário, chama o modelo e devolve a lista validada de sugestões de presentes.

## Requirements

### Requirement: Inicialização do SDK com chave do ambiente
O serviço DEVE inicializar o SDK oficial `@google/genai` usando a chave de API lida exclusivamente de `GEMINI_API_KEY` do ambiente (`.env`), nunca hardcoded no código. Se a chave estiver ausente, o serviço DEVE falhar de forma clara e tipada.

#### Scenario: Chave presente no ambiente
- **WHEN** `GEMINI_API_KEY` está definida no ambiente
- **THEN** o SDK é inicializado com essa chave e o serviço fica pronto para usar

#### Scenario: Chave ausente
- **WHEN** `GEMINI_API_KEY` não está definida no ambiente
- **THEN** o serviço falha com um erro claro informando a configuração da chave, antes de qualquer chamada ao modelo

### Requirement: Montagem do prompt de primeira geração
O serviço DEVE montar o prompt de primeira geração a partir do texto livre do usuário e dos filtros opcionais de orçamento e ocasião (seção 6.3 do OVERVIEW), instruindo o modelo a responder **APENAS JSON** no formato `[{"nome": "", "justificativa": ""}]` com exatamente 5 sugestões.

#### Scenario: Prompt com texto livre apenas
- **WHEN** o usuário fornece apenas o texto livre, sem orçamento nem ocasião
- **THEN** o prompt inclui o texto livre e não faz referência a orçamento ou ocasião

#### Scenario: Prompt com orçamento e ocasião
- **WHEN** o usuário fornece texto livre, um orçamento e uma ocasião selecionados
- **THEN** o prompt inclui o texto livre e ambos os filtros, e a seleção de sugestões respeita esses filtros

#### Scenario: Instrução de resposta JSON
- **WHEN** o serviço monta o prompt
- **THEN** o prompt instrui o modelo a responder apenas JSON no formato `[{"nome","justificativa"}]` com exatamente 5 sugestões

### Requirement: Chamada ao modelo
O serviço DEVE enviar o prompt ao modelo Gemini via o cliente HTTP embutido no SDK, sem realizar fetch/Axios manual, e retornar o texto gerado pelo modelo para parsing.

#### Scenario: Chamada bem-sucedida
- **WHEN** o modelo resposta com sucesso
- **THEN** o serviço recebe o texto gerado e segue para o parsing da resposta

#### Scenario: Falha na requisição
- **WHEN** a chamada ao modelo falha (rede, timeout ou erro da API)
- **THEN** o serviço propaga um erro tipado tratável (o erro é tratado como "Tentar novamente" pelo chamador)

### Requirement: Parsing e validação da resposta JSON
O serviço DEVE fazer o parsing do texto JSON retornado pelo modelo em uma lista tipada de sugestões, validando o formato `[{nome, justificativa}]` e o número de itens. Cada sugestão DEVE ter campos `nome` (string) e `justificativa` (string) preenchidos.

#### Scenario: Resposta JSON válida com 5 sugestões
- **WHEN** o modelo retorna JSON válido com exatamente 5 sugestões com `nome` e `justificativa`
- **THEN** o serviço retorna a lista tipada com as 5 sugestões

#### Scenario: Resposta com número de itens diferente de 5
- **WHEN** o modelo retorna JSON válido, porém com quantidade de sugestões diferente de 5
- **THEN** o serviço falha com erro de validação informando a quantidade esperada

#### Scenario: JSON malformado ou campos ausentes
- **WHEN** o modelo retorna texto que não é JSON válido ou com itens sem `nome`/`justificativa`
- **THEN** o serviço falha com erro de parsing/validação tipado

### Requirement: Interface tipada de serviço
O serviço DEVE expor uma função tipada que recebe o texto livre e os filtros opcionais (orçamento/ocasião) e retorna a lista tipada de sugestões, encapsulando a montagem do prompt, a chamada ao modelo, o parsing e a validação.

#### Scenario: Consumo pela tela de resultados
- **WHEN** um chamador (ex.: ResultsScreen) invoca a função do serviço com entrada válida
- **THEN** ele recebe uma lista tipada de 5 sugestões `{nome, justificativa}` ou um erro tipado tratável
