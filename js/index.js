const body = document.querySelector("body");

const pokemons = document.querySelector(".pokemons");
const carregarMais = document.querySelector(".btnNext");

const buscarEnterPokemon = document.querySelector(".search__input");
const buscarBtnPokemon = document.querySelector(".search__button");
const filtroPokemonAgua = document.querySelector(".btn--water");
const filtroPokemonFogo = document.querySelector(".btn--fire");
const filtroPokemon = document.querySelector(".btn--all");

const modalSobreposto = document.querySelector(".modal__overlay");
const modal = document.querySelector(".modal");
const fecharModal = document.querySelector(".modal__close");
const nomeModal = document.querySelector(".modal__name");
const imagemModal = document.querySelector(".modal__image");
const pesoPokemonModal = document.querySelector(".modal__value__weight");
const tamanhoPokemonModal = document.querySelector(".modal__value__height");
const primeiroTipo = document.querySelectorAll(".btn--category")[3];
const segundoTipo = document.querySelectorAll(".btn--category")[4];


let pokemonData = {};
let pokemonLista = [];
let idApi = 0;

async function cardPokedex(idApi) {
    try {

        const response = await api.get(`https://pokeapi.co/api/v2/pokemon?limit20&offset=${idApi}`);
        const { results } = response.data;

        for (const result of results) {
            const url = result.url;
            const resposta = await api.get(`${url}`);
            const { data } = resposta;

            pokemonData = {
                nome: data.name,
                id: data.id,
                imagem: data.sprites.other.dream_world.front_default,
                peso: data.weight,
                tamanho: data.height,
                tipo: data.types.map((type) => type.type.name)
            };
            pokemonLista.push(pokemonData);
        }
        atualizarPokemon();
    } catch (error) {
        console.log(error);
    }
}
async function carregarPokedexInput(filtro) {
    try {
        const pokemonInput = []
        //levando em considedação apenas os primeiros 150 pokemons para que o carregamento não fique lento
        for (let i = 1; i < 150; i++) {
            const resposta = await api.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const { data } = resposta;
            pokemonData = {
                nome: data.name,
                id: data.id,
                imagem: data.sprites.other.dream_world.front_default,
                peso: data.weight,
                tamanho: data.height,
                tipo: data.types.map((type) => type.type.name)
            };

            if (filtro === pokemonData.nome) {
                pokemonInput.push(pokemonData);
            }
            if (filtro == pokemonData.tipo) {
                pokemonInput.push(pokemonData);
            }
        }
        pokemonLista = pokemonInput;
        atualizarPokemon();
    } catch (error) {
        console.log(error);
    }
}


function atualizarPokemon() {
    pokemons.innerHTML = "";

    try {

        for (const item of pokemonLista) {

            const pokemon = document.createElement("div");
            pokemon.classList.add("pokemon");
            pokemon.classList.add(item.tipo[0]);
            pokemons.appendChild(pokemon);

            const pokemon__code = document.createElement("h3");
            pokemon__code.classList.add("pokemon__code");
            pokemon__code.textContent = `#${item.id}`;
            pokemon__code.classList.add(item.tipo[0]);
            pokemon.appendChild(pokemon__code);

            const pokemon__image = document.createElement("img");
            pokemon__image.classList.add("pokemon__image");
            pokemon.appendChild(pokemon__image);
            pokemon__image.src = item.imagem;
            pokemon__image.alt = item.nome;


            const pokemon__name = document.createElement("h1");
            pokemon__name.classList.add("pokemon__name");
            pokemon__name.textContent = item.nome;
            pokemon__name.classList.add(item.tipo[0]);
            pokemon.appendChild(pokemon__name);

            const tipo = []
            tipo.textContent = item.tipo;

            pokemon.addEventListener("click", () => {
                dadosModal(item);
            });

        }

    } catch (error) {
        console.log(error);
    }
}

carregarMais.addEventListener("click", () => {
    cardPokedex(idApi += 20);
    atualizarPokemon();
});


function dadosModal(pokemonModal) {

    modalSobreposto.classList.add('active');
    nomeModal.textContent = pokemonModal.nome;
    imagemModal.src = pokemonModal.imagem;
    imagemModal.alt = pokemonModal.nome;
    pesoPokemonModal.textContent = pokemonModal.peso;
    tamanhoPokemonModal.textContent = pokemonModal.tamanho;

    if (pokemonModal.tipo[1]) {
        primeiroTipo.textContent = pokemonModal.tipo[0];
        segundoTipo.textContent = pokemonModal.tipo[1];
        segundoTipo.style.visibility = "visible";
    } else {
        primeiroTipo.textContent = pokemonModal.tipo[0];
        segundoTipo.style.visibility = "hidden";
    }
}

fecharModal.addEventListener("click", () => {
    modalSobreposto.classList.remove('active');
});

buscarEnterPokemon.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
        filtroPokemonFogo.classList.remove('btn--selected');
        filtroPokemonAgua.classList.remove('btn--selected');
        filtroPokemon.classList.add('btn--selected');
        return;
    }
    if (!buscarEnterPokemon.value) {
        cardPokedex(idApi);
        pokemonLista = [];
        filtroPokemonFogo.classList.remove('btn--selected');
        filtroPokemonAgua.classList.remove('btn--selected');
        filtroPokemon.classList.add('btn--selected');
        return;
    } else {
        carregarPokedexInput(buscarEnterPokemon.value);
    }
    buscarEnterPokemon.value = "";
});

buscarBtnPokemon.addEventListener("click", () => {
    pokemonLista = [];
    if (!buscarEnterPokemon.value) {
        cardPokedex(idApi);
        filtroPokemonFogo.classList.remove('btn--selected');
        filtroPokemonAgua.classList.remove('btn--selected');
        filtroPokemon.classList.add('btn--selected');
        return;
    } else {
        carregarPokedexInput(buscarEnterPokemon.value);
    }
    buscarEnterPokemon.value = "";
});

filtroPokemonAgua.addEventListener("click", () => {
    filtroPokemonAgua.classList.add('btn--selected');
    filtroPokemonFogo.classList.remove('btn--selected');
    filtroPokemon.classList.remove('btn--selected');
    carregarPokedexInput("water");
});

filtroPokemonFogo.addEventListener("click", () => {
    filtroPokemonFogo.classList.add('btn--selected');
    filtroPokemonAgua.classList.remove('btn--selected');
    filtroPokemon.classList.remove('btn--selected');
    carregarPokedexInput("fire");
});

filtroPokemon.addEventListener("click", () => {
    filtroPokemonFogo.classList.remove('btn--selected');
    filtroPokemonAgua.classList.remove('btn--selected');
    filtroPokemon.classList.add('btn--selected');
    cardPokedex(idApi);
    pokemonLista = [];
});
atualizarPokemon();
cardPokedex();