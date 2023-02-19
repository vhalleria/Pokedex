# Pokedex

![](https://i.imgur.com/xG74tOh.png)

# Desafio Front-end - Módulo 2 - CUBOS

Você acabou de ser contratado pela melhor empresa de tecnologia do mundo: a **CUBOS**.
Sua primeira tarefa como desenvolvedor é criar uma pokedex (aplicação que lista os pokemons).

Seu papel é construir um website com [o seguinte design](https://www.figma.com/file/KVHZiWPMbgZ4eDz2T5oQ9M/pokedex?node-id=0%3A1) que permita: (funcionalidades com * ao lado são obrigatórias)

- Visualização de pokemons (*)
- Carregar mais pokemons (paginação de 20 em 20 itens)  (*)
- Busca de pokemon (*)
- Modal de Pokemon (*)
- Slide de Pokemon no Modal 
- Visualização de pokemons por categorias 
- Mudança de tema

Os dados do website serão requisitados da [seguinte API](https://pokeapi.co/)

## Detalhamentos de Requisitos

### Visualização de pokemons

Assim que o website for aberto, a listagem de pokemons deverá ser feita primeiramente atraves do [seguinte endpoint](https://pokeapi.co/api/v2/pokemon?limit20&offset=0) 


Exemplo de retorno:

```json
{
  "count": 1154,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  "previous": null,
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/"
    },
    {
      "name": "venusaur",
      "url": "https://pokeapi.co/api/v2/pokemon/3/"
    },
    {
      "name": "charmander",
      "url": "https://pokeapi.co/api/v2/pokemon/4/"
    },
    {
      "name": "charmeleon",
      "url": "https://pokeapi.co/api/v2/pokemon/5/"
    },
    {
      "name": "charizard",
      "url": "https://pokeapi.co/api/v2/pokemon/6/"
    },
    {
      "name": "squirtle",
      "url": "https://pokeapi.co/api/v2/pokemon/7/"
    },
    {
      "name": "wartortle",
      "url": "https://pokeapi.co/api/v2/pokemon/8/"
    },
    {
      "name": "blastoise",
      "url": "https://pokeapi.co/api/v2/pokemon/9/"
    },
    {
      "name": "caterpie",
      "url": "https://pokeapi.co/api/v2/pokemon/10/"
    },
    {
      "name": "metapod",
      "url": "https://pokeapi.co/api/v2/pokemon/11/"
    },
    {
      "name": "butterfree",
      "url": "https://pokeapi.co/api/v2/pokemon/12/"
    },
    {
      "name": "weedle",
      "url": "https://pokeapi.co/api/v2/pokemon/13/"
    },
    {
      "name": "kakuna",
      "url": "https://pokeapi.co/api/v2/pokemon/14/"
    },
    {
      "name": "beedrill",
      "url": "https://pokeapi.co/api/v2/pokemon/15/"
    },
    {
      "name": "pidgey",
      "url": "https://pokeapi.co/api/v2/pokemon/16/"
    },
    {
      "name": "pidgeotto",
      "url": "https://pokeapi.co/api/v2/pokemon/17/"
    },
    {
      "name": "pidgeot",
      "url": "https://pokeapi.co/api/v2/pokemon/18/"
    },
    {
      "name": "rattata",
      "url": "https://pokeapi.co/api/v2/pokemon/19/"
    },
    {
      "name": "raticate",
      "url": "https://pokeapi.co/api/v2/pokemon/20/"
    }
  ]
}
```

como o endpoint acima não possui informações suficientes dos pokemons, será necessário criar uma nova requisição com a url retornada para cada um dos pokemons (é isso mesmo que você está pensando for/laço de repetição) e com o retorno dessas informações você deverá preencher: 

exemplo de url: https://pokeapi.co/api/v2/pokemon/1/

A estrutura HTML deverá ser a seguinte:
![](https://i.imgur.com/x24xdIx.png)

Informações do retorno da API necessárias para o preenchimento:
- a div  deve ter a class `<div class="pokemon">` === types[0].type.name
- o h3 deve ter o texto  `<h3 class="pokemon__code"></h3>` === id
- o h3 deve a class  `<h3 class="pokemon__code"></h3>` === types[0].type.name
- a imagem deve ter o src `<img src="" alt="" class="pokemon__image"/>` === sprites.other.dream_world.front_default
- a imagem deve ter o alt `<img src="" alt="" class="pokemon__image"/>` === name
- h1 deve ter o texto `<h1 class="pokemon__name content__flex align__center justify__center"></h1>` === name
- h1 deve a class `<h1 class="pokemon__name content__flex align__center justify__center"></h1>` === types[0].type.name

Essa estrutura terá que ser criada para **cada pokemon** poderá ser construida dinamicamente pela DOM, porém, isso **não é obrigatório**.

Cada pokemon deverá ser colocado dentro da `<div class="pokemons">`

### Carregar mais pokemons (Paginação de 20 em 20 itens)

O botão carregar mais, ao ser clicado deve trazer os próximos 20 pokemons, isso quer dizer se sua listagem já possui 20 pokemos após clicar uma vez no botão carregar mais a quantidade de pokemons passará a ser 40.

O endpoint será o mesmo da vizualização de pokemons https://pokeapi.co/api/v2/pokemon?limit20&offset=0, o que será necessário mudar vai ser o valor do offset na url, somando sempre mais 20 pokemons

lembre-se que ao buscar os novos pokemons eles terão de aparecer em tela

### Busca de pokemon

O usuário poderá buscar um pokemon por meio do `<input type="text" name="search" class="search__input" placeholder="Buscar pokemon"/>`

Quando o usuário pressionar a tecla "Enter" enquanto estiver com foco no input, algumas coisas teram que acontecer:

- Se o input possuir algum valor, você deverá realizar uma busca na listagem de pokemons, através do nome do pokemon

- Se o input não possuir valor nenhum, você deverá realizar a mesma busca que é feita para preencher os pokemons iniciais (Visualização de pokemons)

OBS: se o usuário clicar na `<img src="./image/search.svg" class="search__button" alt="buscar pokemon"/>` deve ocorrer as mesmas coisa que ao clicar "Enter"

### Modal de Pokemon

Ao clicar em um pokemon da listagem deve abrir um modal com as informações do pokemon, a estrutura já existe dentro do arquivo index.html, você deve somente trocar os dados existentes pelos dados do pokemon


A estrutura HTML deverá ser a seguinte:
![](https://i.imgur.com/sGpQSaT.png)

Com as informações do pokemon deve ser feito o preenchimento:
- o h2 deve ter o texto `<h2 class="modal__name"></h2>` === name
- a imagem deve ter o src`<img src="./image/Bulbasaur.png" alt="pokemon" class="modal__image" />` === sprites.other.dream_world.front_default
- a imagem deve ter o alt `<img src="./image/Bulbasaur.png" alt="pokemon" class="modal__image" /` === name
- a div `<div class="modal__categories content__flex justify__center"></div>` deve ter um `<button class="btn btn--category"></button>` para cada type do pokemon === types 
- e cada botão deve ter o texto `<button class="btn btn--category"></button>` == type.name
- a span deve ter o texto `<span class="modal__value modal__value__weight">6,9kg</span>` === weight
- a span deve ter o texto ` <span class="modal__value modal__value__height">0,7m</span>` === height

todas as informações vem do endpoint de "Visualização de pokemons"

- Para o modal abrir basta adicionar a class 'active' em `<section class="modal__overlay align__center justify__center">`

- o modal deve fechar ao clicar em `<img src="./image/close.svg" alt="fechar modal" class="modal__close"/>`

- para o modal fechar basta retirar a classe 'active' em `<section class="modal__overlay align__center justify__center">`

### Slide de Pokemon no Modal

O modal deve possuir setas para ir para o próximo pokemon ou para o pokemon anterior
Lembre-se
- Considere somente a listagem de pokemon em tela
- Se for o ultimo pokemon não deve ser possivel passar para o próximo pokemon
- Se for o primeiro pokemon não deve ser possivel passar para o pokemon anterior
- O slide deve sempre começar do pokemon que foi clicado

## Visualização de pokemons por categorias
ao clicar em um dos botões de categoria (all, water e fire) deve ocorrer uma filtragem com os pokemons listados e trazer somente aqueles que pertencerem a essa categoria do botão, o campo que será usado pra filter === type.name

![](https://i.imgur.com/byMBODN.png)

### Mudança de tema 
Ao checar a `<input type="checkbox" class="switch__input" />`, caso o **tema atual** seja "light" ou "claro", o mesmo deverá ser trocado para o tema "dark" ou "escuro", após isso, você deverá modificar o tema (imagens e cores) do seu website de acordo com o Figma. Essa troca de tema, poderá ser facilitada caso seja feita por meio da troca de variáveis CSS.

- não é obrigatório guardar o tema no LocalStorage
- a variavel que você precisará alterar para mudar o tema é a --background

## Aulas úteis:

-   [Selecionando elementos mais facilmente | Modificando as propriedades dos elementos | Manipulando classes com a DOM | Evento de clique]
-   [Evento de Tecla e objeto de eventos | Target e multiplos eventos]
-   [Resumo position fixed | Criando um modal]
-   [Fetch e assincronismo | Populando a página com informações externas]
-   [Criando e adicionando elementos]
-   [Variaveis CSS | Modificando as variaveis CSS pelo DOM e LocalStorage]

**LEMBRE-SE**: Feito é melhor do que perfeito, mas não faça mal feito!!!

###### tags: `front-end` `módulo 2` `HTML` `DOM` `CSS` `desafio alternativo`
