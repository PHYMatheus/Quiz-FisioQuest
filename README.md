# Quiz FisioQuest 🎓

Mini quiz web feito em React + Vite. Menu → Cadastro (nome + disciplina) → Perguntas → Feedback → Resultado → Ranking com pódio (top 3 em destaque) → Comentários dos jogadores.

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Estrutura

```
src/
App.jsx # controla a navegação entre telas
theme.js # paleta de cores (tons de verde)
firebase.js # onde o ranking/comentários/visitas são salvos e lidos
data/perguntas.js # banco de perguntas — edite aqui
components/
Menu.jsx
Cadastro.jsx
Quiz.jsx
Resultado.jsx
Ranking.jsx
Comentarios.jsx
Sobre.jsx
ErrorBoundary.jsx # evita tela branca em caso de erro inesperado

```


## Banco de dados (Firestore)

O ranking, os comentários e o contador de visitas ficam salvos no **Cloud
Firestore** (projeto `quiz-fisioquest` no Firebase), compartilhado entre
todo mundo que acessa o link — não é `localStorage`.

**Detalhe importante de arquitetura:** `src/firebase.js` fala com o
Firestore usando a **REST API dele** (chamadas HTTP comuns via `fetch`),
em vez do SDK oficial (`firebase/firestore`). Isso foi uma decisão
intencional: o SDK oficial usa um tipo de conexão de longa duração
("streaming"/long-polling) que trava em redes com firewall ou antivírus
mais restritivos, mesmo com a internet normal funcionando. Chamadas HTTP
comuns atravessam praticamente qualquer rede sem esse problema. Por isso
o pacote `firebase` **não é** uma dependência do projeto.

Se o salvamento falhar (ex: sem internet no momento), o jogo avisa o
jogador na tela em vez de fingir que deu tudo certo — não é um bug se
aparecer esse aviso ocasionalmente, é o comportamento esperado.

## Colocando a logo da turma

Coloque o arquivo de imagem em `src/assets/` e siga o comentário no topo
de `src/components/Menu.jsx` para trocar o emoji pela logo.

