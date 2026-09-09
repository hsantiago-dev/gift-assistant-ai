# Gift Assistant AI

[![Expo](https://img.shields.io/badge/Expo-SDK%2057-000020?logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.86-61DAFB?logo=react&logoColor=white)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> Aplicativo mobile que utiliza inteligência artificial (Google Gemini) para sugerir presentes personalizados com base em texto livre e filtros opcionais de orçamento e ocasião.

---

## Contexto acadêmico

Este projeto foi desenvolvido como trabalho de pós-graduação na disciplina de **Dispositivos Móveis**. O objetivo é consolidar o aprendizado prático sobre:

- **Google Gemini SDK** — integração com IA generativa via `@google/genai`
- **Expo Router** — roteamento baseado em arquivos
- **Moti + Reanimated** — animações fluidas e microinterações
- **React 19 + React Native 0.86** — hooks, estado e ciclo de vida
- **TypeScript** — tipagem estática e segurança em tempo de compilação

---

## Screenshots

[![Tela inicial](/images/Screenshot_1.png)](/images/Screenshot_1.png) [![Estado de loading](/images/Screenshot_2.png)](/images/Screenshot_2.png)

[![Estado de erro](/images/Screenshot_3.png)](/images/Screenshot_3.png) [![Resultados](/images/Screenshot_4.png)](/images/Screenshot_4.png)

---

## Funcionalidades

- **Entrada de texto livre** — o usuário descreve o que procura em frases naturais
- **Chips opcionais** — seleção de orçamento e/ou ocasião (seleção única, sem obrigatoriedade)
- **Placeholder dinâmico** — a frase de exemplo do campo de texto varia a cada abertura da tela
- **Geração via IA** — envio do prompt à API Gemini, que responde com JSON estruturado
- **5 sugestões de presentes** — cada uma com nome e justificativa personalizada
- **Carrossel de cards** — visualização das sugestões com animações de entrada
- **Estado de loading** — feedback visual com animação Moti durante a consulta à IA
- **Estado de erro** — tratamento de falhas de rede/timeout/API com opção "Tentar novamente"

---

## Como executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`) ou Expo Go instalado no dispositivo
- Chave de API do Google Gemini (veja seção [Configuração de API Keys](#configuração-de-api-keys))

### Passo a passo

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd gift-assistant-ai
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as chaves** (veja seção [Configuração de API Keys](#configuração-de-api-keys))

4. **Inicie o app**

   ```bash
   npx expo start
   ```

5. **Abra no dispositivo** — escaneie o QR code com o Expo Go ou rode no emulador/simulador

---

## Configuração de API Keys

As chaves sensíveis **não** devem ser commitadas. Use o arquivo `.env` na raiz do projeto (já ignorado pelo Git).

### 1. Crie o arquivo `.env`

```
# Chave da API do Google Gemini (obrigatório)
EXPO_PUBLIC_GEMINI_API_KEY=sua_chave_gemini_aqui
```

### 2. Google Gemini API

1. Acesse o [Google AI Studio](https://aistudio.google.com/apikey)
2. Crie uma chave de API
3. Cole em `EXPO_PUBLIC_GEMINI_API_KEY` no arquivo `.env`

---

## Referências

- [Documentação Expo](https://docs.expo.dev)
- [Expo Router](https://docs.expo.dev/router/introduction)
- [React Native](https://reactnative.dev/docs/getting-started)
- [Google Gemini SDK](https://ai.google.dev/docs)
- [Moti — Animações](https://moti.fabric.dev)
- [Design System Candy](./.docs/DESIGN.md)
- [Especificação Funcional](./.docs/OVERVIEW.md)

---

## Autor

**Nome:** Henrick Santiago

**Instituição:** UTFPR

- LinkedIn: [linkedin.com/in/hsantiago-dev](https://www.linkedin.com/in/hsantiago-dev/)
- GitHub: [@hsantiago-dev](https://github.com/hsantiago-dev)
