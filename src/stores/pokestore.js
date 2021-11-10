// to expose data to our components, use a "writable"
import { writable } from 'svelte/store';

export const pokemon = writable([]); // start as empty array

const fetchPokemon = async () => {
	const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
	const res = await fetch(url);
	const data = await res.json();
	const loadedPokemon = data.results.map((data, idx) => {
		return {
			id: idx + 1,
			name: data.name
			// image here
		};
	});

	pokemon.set(loadedPokemon);
};

fetchPokemon();
