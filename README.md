# Quiz da Turma

Mini quiz web feito em React + Vite. Menu → Cadastro (nome + disciplina) → Perguntas → Feedback → Resultado → Ranking com pódio (top 3 em destaque).

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Estrutura

```
src/
  App.jsx              # controla a navegação entre telas
  theme.js              # paleta de cores (tons de verde)
  firebase.js            # onde o ranking é salvo/lido (localStorage por padrão)
  data/perguntas.js      # banco de perguntas — edite aqui
  components/
    Menu.jsx
    Cadastro.jsx
    Quiz.jsx
    Resultado.jsx
    Ranking.jsx
```

## Deixando o ranking online (compartilhado entre dispositivos)

Por padrão o ranking fica salvo só no navegador de quem está jogando
(`localStorage`). Para que todo mundo veja o mesmo ranking através de um
link, siga as instruções detalhadas dentro de `src/firebase.js` — é só
criar um projeto gratuito no Firebase, colar as credenciais e trocar um
bloco de código comentado. Nenhum outro arquivo precisa mudar.

## Colocando a logo da turma

Coloque o arquivo de imagem em `src/assets/` (crie a pasta) e siga o
comentário no topo de `src/components/Menu.jsx` para trocar o emoji pela
logo.

## Publicando o link

Depois de testar localmente:

1. Suba o projeto para um repositório no GitHub
2. Conecte o repositório na [Vercel](https://vercel.com) ou [Netlify](https://netlify.com)
3. Publique — você recebe um link público (ex: `quiz-turma.vercel.app`)
