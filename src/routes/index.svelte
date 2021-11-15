<script context="module">
	// will run on page load
	// using stores, the page loads and then the data is fetched and displayed
	// using load, the data is fetched before the page renders
	export async function load() {
		const url = `https://pokeapi.co/api/v2/pokemon?limit=25`;
		const res = await fetch(url);
		const data = await res.json();
		const loadedPokemon = data.results.map((data, index) => {
			return {
				id: index + 1,
				name: data.name,
				image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
					index + 1
				}.png`
			};
		});

		return {
			props: {
				pokemon: loadedPokemon
			}
		};
	}
</script>

<script>
	// we could use a store for the Pokemon but it's not needed
	// instead, hit the API on page load
	// import {pokemon, fetchPokemon} from "../pokestore";
	import PokemanCard from '../components/pokemanCard.svelte';
	// need the $ to get the data out of the store
	// and to enable reactivity
	// console.log($pokemon);

	export let pokemon;

	let searchTerm = '';
	let filteredPokemon = [];

	// this acts as a function that automatically gets called
	// whenever data referenced within changes
	// in this case, searchTerm
	// like useEffect() in React
	$: {
		if (searchTerm) {
			// search the pokemon
			filteredPokemon = pokemon.filter((pokeman) =>
				pokeman.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filteredPokemon = [...pokemon];
		}
	}

	// fetchPokemon();
</script>

<svelte:head>
	<title>SvelteKit Pokedex</title>
</svelte:head>

<h1 class="text-4xl text-center my-8 uppercase">Hello World</h1>

<input
	type="text"
	class="w-full rounded-md text-lg p-4 border-2 border-gray-200"
	placeholder="Search Pokemon"
	bind:value={searchTerm}
/>
<div class="grid gap-4 grid-cols-1 md:grid-cols-2">
	{#each filteredPokemon as pokeman}
		<PokemanCard {pokeman} />
	{/each}
</div>
