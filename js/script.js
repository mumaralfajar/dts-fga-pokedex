const btn = document.getElementById('getBtn');
const poke_container = document.getElementById('poke_container');
let pokemons_number = 0;
let i = 1;
const colors = {
	fire: '#F08030',
	grass: '#78C850',
	electric: '#F8D030',
	water: '#6890F0',
	ground: '#E0C068',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#A040A0',
	bug: '#A8B820',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#A890F0',
	fighting: '#E6E0D4',
	normal: '#A8A878'
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (i; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
	return i = pokemons_number + 1;
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = color;

	const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
							pokemon.id
						}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonEl);
}

//fetchPokemons();

btn.addEventListener("click", function() {
	pokemons_number += 30;
	fetchPokemons();
	if (pokemons_number >= 60) {
		alert("30 more Pokémons has been added!");
	}
});