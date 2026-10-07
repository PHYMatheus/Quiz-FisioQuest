# 🎓 FisioQuest

> **Quiz interativo de Fisioterapia desenvolvido para testar conhecimentos de forma rápida, simples e divertida.**

O **FisioQuest** é uma aplicação web desenvolvida com **React + Vite**, onde os jogadores podem responder perguntas, acompanhar seu desempenho e disputar posições no ranking.

🌐 **Acesse o projeto:** `EM BREVE`

---

## ✨ Funcionalidades

* 👤 Cadastro do jogador
* 📚 Seleção de disciplina
* 🧠 Quiz com perguntas e respostas
* 💬 Feedback após as respostas
* 🏆 Resultado final
* 🥇 Ranking global com pódio
* 💭 Comentários dos jogadores
* 👀 Contador de visitas
* 🛡️ Tratamento de erros da aplicação
* ☁️ Dados compartilhados através do Firebase Firestore

---

## 🛠️ Tecnologias

| Tecnologia            | Utilização                     |
| --------------------- | ------------------------------ |
| ⚛️ React              | Interface da aplicação         |
| ⚡ Vite                | Build e desenvolvimento        |
| 🎨 CSS                | Estilização                    |
| 🔥 Firebase Firestore | Ranking, comentários e visitas |
| 🌐 REST API           | Comunicação com o Firestore    |
| 📦 JavaScript         | Lógica da aplicação            |

---

## 🚀 Como executar

### 1. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Acesse a pasta

```bash
cd fisioquest
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o projeto

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

---

## 📁 Estrutura do projeto

```text
src/
├── assets/
├── components/
│   ├── Menu.jsx
│   ├── Cadastro.jsx
│   ├── Quiz.jsx
│   ├── Resultado.jsx
│   ├── Ranking.jsx
│   ├── Comentarios.jsx
│   ├── Sobre.jsx
│   └── ErrorBoundary.jsx
│
├── data/
│   └── perguntas.js
│
├── App.jsx
├── firebase.js
└── theme.js
```

### 📝 Onde alterar as perguntas?

As perguntas do quiz ficam em:

```text
src/data/perguntas.js
```

É possível adicionar, remover ou modificar as questões diretamente nesse arquivo.

---

## ☁️ Firebase

O **FisioQuest** utiliza o **Cloud Firestore** para armazenar dados compartilhados entre os jogadores.

São utilizados principalmente para:

* 🏆 Ranking
* 💬 Comentários
* 👀 Contador de visitas

Os dados ficam armazenados na nuvem, permitindo que diferentes jogadores vejam as mesmas informações ao acessar a aplicação.

> A comunicação com o Firestore é realizada através de requisições HTTP utilizando `fetch`.

---

## 🎨 Personalização

A identidade visual do projeto pode ser ajustada através de:

```text
src/theme.js
```

Para adicionar a logo da turma, coloque a imagem em:

```text
src/assets/
```

e ajuste o componente:

```text
src/components/Menu.jsx
```

---

## 📌 Objetivo

O FisioQuest foi criado com o objetivo de transformar a revisão de conteúdos de **Fisioterapia** em uma experiência mais interativa, permitindo que os estudantes testem seus conhecimentos e acompanhem seu desempenho.

---

## 👨‍💻 Desenvolvimento

Projeto desenvolvido utilizando **React, Vite e Firebase**, com foco em aprendizado, interatividade e experiência do usuário.

⭐ Se você gostou do projeto, considere deixar uma estrela no repositório!

