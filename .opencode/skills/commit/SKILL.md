---
name: commit
description: Gera e executa commits de código seguindo Conventional Commits. Use SEMPRE que o usuário pedir para commitar, fazer commit, criar um commit, "git commit", commitar código, salvar alterações via git, ou solicitar uma mensagem de commit. Revisa os commits anteriores para manter o estilo, detecta changes/specs OpenSpec e SEMPRE apresenta a mensagem ao usuário antes de commitar.
---

# Commit de código

Gera mensagens de commit seguindo **Conventional Commits**, no estilo já
estabelecido pelo repositório (idioma **português**, subject curto). A mensagem
deve **sempre** ser mostrada ao usuário para aprovação **antes** de executar o
commit — nunca commitar sem confirmação explícita.

## Passos

1. **Revisar o contexto do repositório**
   - Rodar `git status --short` e `git diff --stat HEAD` para ver o que mudou.
   - Rodar `git log --oneline -10` para capturar o tipo, o idioma e o escopo
     usados nos commits anteriores e manter consistência.

2. **Entender as mudanças**
   - Revisar os arquivos staged/modificados para resumir em poucas palavras o
     que foi alterado. Mantenha o resumo objetivo; **sem descrições longas** no
     subject.

3. **Detectar spec OpenSpec**
   - Verificar se há mudanças em `openspec/` (`openspec/changes/`,
     `openspec/specs/`).
   - Se uma change ou spec foi adicionada/alterada, refletir isso no tipo e
     escopo da mensagem (ex.: `feat(<capability>): ...` ou `docs:` quando a
     mudança for só de documentação/spec). Ao incluir uma spec, priorize
     comunicar a capability/feature entregue.

4. **Montar a mensagem Conventional Commit**
   - Formato: `<tipo>(<escopo>): <resumo>` — escopo opcional.
   - Tipos: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `perf`, `build`.
   - Subject curto e em **português**, acompanhando o padrão do repo
     (ex.: `feat: implementa tela Home com chips e botão de ação`).
   - **Sem corpo/descrições extensas** a menos que o usuário peça.

5. **Apresentar a mensagem ao usuário (obrigatório)**
   - Exibir a mensagem proposta em destaque e aguardar aprovação/edição antes
     de qualquer `git commit`:
     ```
     Mensagem de commit proposta:
     feat(gemini): adiciona serviço de geração de sugestões
     ```
   - Se o usuário editar, usar a versão editada.

6. **Executar somente após aprovação**
   - Após o usuário confirmar/adjustar, rodar `git add` para os arquivos
     relevantes e `git commit -m "<mensagem>"`.
   - **Nunca** commitar arquivos que o usuário não pediu para incluir; não
     commitar segredos (`.env`) e respeitar o `.gitignore`.
