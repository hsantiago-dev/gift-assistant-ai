## 1. Configuração de ambiente e dependência

- [x] 1.1 Instalar o SDK oficial `@google/genai` nas `dependencies` e verificar que `npx expo install`/npm resolve e que `@google/generative-ai` (descontinuado) NÃO é instalado
- [x] 1.2 Criar `.env` (fora do git) com `GEMINI_API_KEY=` e `.env.example` documentando a key, e garantir que `.env` está no `.gitignore`; verificar que a chave não aparece hardcoded em nenhum arquivo de código

## 2. Serviço Gemini (src/services/gemini.ts)

- [x] 2.1 Definir tipos `GiftSuggestion = { nome: string; justificativa: string }` e `GenerateSuggestionInput = { text: string; budget?: string; occasion?: string }`, e verificar que compilam (tsc --noEmit)
- [x] 2.2 Implementar inicialização do SDK a partir de `GEMINI_API_KEY` do ambiente, lançando erro claro e tipado quando a chave estiver ausente, e verificar que a falha ocorre antes de qualquer chamada ao modelo
- [x] 2.3 Implementar função pura `buildFirstGenPrompt(input)` conforme a seção 6.3 do OVERVIEW (texto livre + filtros opcionais + instrução de resposta APENAS JSON com 5 sugestões) e verificar que o prompt inclui texto quando não há filtros e inclui orçamento/ocasião quando fornecidos
- [x] 2.4 Implementar `generateSuggestion(input)` que chama o modelo via o cliente HTTP embutido do SDK (sem fetch/Axios manual) e retorna o texto gerado, e verificar que a chamada usa a instância inicializada
- [x] 2.5 Implementar parse + validação estrita da resposta JSON (exatamente 5 itens, cada um com `nome`/`justificativa` não vazios), com limpeza de eventuais blocos ```json, e verificar que respostas válidas retornam `GiftSuggestion[]` e que malformadas/de quantidade errada lançam erro tipado

## 3. Tratamento de erros e contrato público

- [x] 3.1 Implementar erros tipados (ex.: `GiftAIError`, com variantes de config/parse/validação/requisição) e verificar que falhas de rede/timeout/API são propagadas de forma tipada (não consomem tentativa de regeneração no chamador)
- [x] 3.2 Verificar que `generateSuggestion` é a única exportação pública consumível (encapsula prompt, chamada, parse e validação) e que não expõe dependências internas

## 4. Verificação de integração

- [x] 4.1 Rodar `npm run lint` e `npx tsc --noEmit` e verificar que passam sem erros
- [x] 4.2 Realizar o teste manual do serviço (único teste desta change): com a `GEMINI_API_KEY` do `.env`, chamar `generateSuggestion` com uma entrada de exemplo (ex.: texto de um presente + um orçamento/ocasião) e coletar a resposta real da API
- [x] 4.3 Apresentar ao usuário o **resultado obtido** no teste manual: exibir a lista JSON crua retornada e/ou as 5 sugestões tipadas (`nome` + `justificativa`) preenchidas, confirmando o contrato de retorno — e aguardar validação antes de encerrar
