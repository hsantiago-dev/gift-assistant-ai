# Assistente de Presentes — Visão Geral do Projeto

## 1. Contexto

Trabalho final da disciplina de React Native. O app recebe uma entrada do usuário (texto livre + filtros rápidos) sobre a pessoa e a ocasião para presentear, envia essa informação para uma API de IA (Gemini) e retorna sugestões de presentes personalizadas, com justificativa para cada uma.

Princípio seguido: **entrada de dados do usuário → processamento por IA → resposta gerada pela IA.**

## 2. Ideia do produto

Um app simples e rápido de usar: o usuário descreve, com suas próprias palavras, para quem e por que está procurando um presente. Pode complementar com dois filtros opcionais (orçamento e ocasião). A IA gera 5 sugestões com uma breve justificativa cada, exibidas em um carrossel de cards.

## 3. Caso de uso do sistema

**Ator:** usuário que precisa escolher um presente para alguém.

### Fluxo principal
1. Usuário abre o app (HomeScreen) e vê um campo de texto livre com placeholder variável (dica de exemplo) e dois chips opcionais: **Orçamento** e **Ocasião**.
2. Usuário descreve a pessoa/situação em texto livre e, opcionalmente, seleciona os chips.
3. Usuário toca em **"Gerar sugestões"**.
4. App monta o prompt com texto + chips e envia à API de IA (Gemini).
5. IA retorna uma lista de sugestões (nome + justificativa) em formato JSON.
6. App exibe as sugestões na ResultsScreen:
   - Como **carrossel**, se houver mais de 1 sugestão.
   - Como card único centralizado, se houver apenas 1 sugestão.

### Fluxo alternativo — erro de requisição
Falha de rede, timeout ou erro da API → app exibe mensagem amigável com opção de tentar novamente.

## 4. Requisitos funcionais

| ID | Descrição |
|---|---|
| RF01 | O app deve permitir que o usuário descreva em texto livre a pessoa/situação para presentear. |
| RF02 | O app deve exibir um placeholder de exemplo no campo de texto, variando entre algumas opções pré-definidas a cada abertura da tela. |
| RF03 | O app deve oferecer um chip de seleção única para orçamento (`Até R$50`, `R$50–150`, `R$150–300`, `Sem limite`). |
| RF04 | O app deve oferecer um chip de seleção única para ocasião (`Aniversário`, `Natal`, `Namorados`, `Sem motivo especial`). |
| RF05 | O app deve montar um prompt combinando texto livre + chips selecionados e enviá-lo à API de IA. |
| RF06 | O app deve exibir a lista de sugestões retornadas (nome + justificativa) em formato de **carrossel**, quando houver mais de 1 sugestão. |
| RF07 | O app deve exibir indicador de carregamento durante a chamada à API. |
| RF08 | O app deve tratar erros de requisição (sem internet, timeout, erro da API) com mensagem clara e opção de tentar novamente. |

## 5. Requisitos não funcionais

| ID | Descrição |
|---|---|
| RNF01 | App desenvolvido em React Native com Expo. |
| RNF02 | Código organizado em pastas (`components`, `screens`, `services`, `styles`, `constants`). |
| RNF03 | Chave da API não deve ficar hardcoded/exposta no repositório (uso de `.env` + `.gitignore`). |
| RNF04 | Interface simples, com boa hierarquia visual (título, campo de texto, chips, carrossel de resultados). |
| RNF05 | Feedback visual claro para: carregando e erro. |
| RNF06 | Transições e microinterações (loading, entrada dos cards, troca no carrossel) devem usar animações leves via Moti, sem prejudicar a performance. |

## 6. Detalhes técnicos já definidos

### 6.1 Chips
Apenas dois filtros rápidos foram escolhidos, por serem dados objetivos e curtos — o restante do contexto (interesses, relação com a pessoa) fica a cargo do texto livre, para preservar a naturalidade da entrada:

- **Orçamento** (seleção única): `Até R$50` · `R$50–150` · `R$150–300` · `Sem limite`
- **Ocasião** (seleção única): `Aniversário` · `Natal` · `Namorados` · `Sem motivo especial`

Ambos são opcionais. Se não selecionados, a IA trabalha só com o texto livre.

### 6.2 Placeholder do campo de texto
Serve como exemplo de uso e sugere implicitamente que tipo de informação ajuda (pessoa + interesse específico), sem parecer um formulário disfarçado. Deve variar entre algumas frases pré-definidas, por exemplo:

- *"Ex: Meu irmão faz 30 anos, é apaixonado por games retrô e café especial..."*
- *"Ex: Minha melhor amiga vai se formar, ela ama plantas e séries de mistério..."*
- *"Ex: Presente de aniversário de namoro, ele curte trilhas e fotografia..."*

### 6.3 Estrutura de prompt — primeira geração

```
Texto do usuário: "{texto_livre}"
Orçamento: {chip_orcamento || "não informado"}
Ocasião: {chip_ocasiao || "não informada"}

Com base nisso, sugira 5 ideias de presente. Se faltar informação
importante (como interesses da pessoa), use sugestões mais versáteis,
mas seja específico sempre que possível.
Responda APENAS em JSON, sem texto adicional:
[{"nome": "", "justificativa": ""}]
```

## 7. Stack técnica

| Camada | Tecnologia |
|---|---|
| Framework | React Native com **Expo** |
| Animações | **Moti** (loading, entrada de cards, transições do carrossel) |
| IA / LLM | **Google Gemini API** |
| SDK de integração | **`@google/genai`** — SDK oficial atual da Google para JS/TS (sucessor do antigo `@google/generative-ai`, hoje descontinuado) |
| Requisições HTTP | Cliente HTTP embutido no próprio SDK (não é necessário Axios/fetch manual para a chamada à IA) |
| Variáveis de ambiente | `.env` (via `expo-constants` ou `react-native-dotenv`) + `.gitignore` |

> **Nota de segurança:** a documentação oficial do Gemini recomenda chamar a API a partir do backend, para não expor a API key no cliente. Como este é um projeto acadêmico sem backend, a chamada será feita diretamente do app, com a key isolada em `.env` (fora do controle de versão) — suficiente para os fins da disciplina, mas não recomendado para produção real.

## 8. Estrutura de telas

1. **HomeScreen** — campo de texto livre, chips de orçamento e ocasião, botão "Gerar sugestões".
2. **ResultsScreen** — carrossel de sugestões (ou card único), botão "Voltar", estados de loading/erro.