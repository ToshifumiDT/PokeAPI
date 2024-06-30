console.log("Hello World!");

const getPokemon = document.getElementById("get-pokemon");
getPokemon.addEventListener("click", fetchPokemon);

document.getElementById("search-input").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        fetchPokemonByName(event.target.value.toLowerCase());
    }
});



async function fetchPokemon() {
    const loadingElement = document.getElementById("loading");
    const pokemonContainer = document.getElementById("pokemon-container");
    loadingElement.style.display = "block";
    pokemonContainer.textContent = "";

    try {
        const randomID = Math.floor(Math.random() * 1010) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomID}`);
        if (!response.ok) {
            throw new Error("Network response was not 200!");
        }
        const pokemon = await response.json();
        displayPokemonData(pokemon);
    } catch (error) {
        console.error("Error fetching the data from the API", error);
        pokemonContainer.textContent = "Failed to get the requested Pokémon from the API, please try again..";
    } finally {
        loadingElement.style.display = "none";
    }
}

async function fetchPokemonByName(name) {
    const loadingElement = document.getElementById("loading");
    const pokemonContainer = document.getElementById("pokemon-container");
    loadingElement.style.display = "block";
    pokemonContainer.textContent = "";

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
            throw new Error("Network did not respond with HTTP Code 200");
        }
        const pokemon = await response.json();
        displayPokemonData(pokemon);
    } catch (error) {
        console.error("Error fetching data from the API", error);
        pokemonContainer.textContent = "Failed to get the requested Pokémon from the API, please try again..";
    } finally {
        loadingElement.style.display = "none";
    }
}

function displayPokemonData(pokemon) {
    const pokemonContainer = document.getElementById("pokemon-container");
    pokemonContainer.textContent = "";
    const nameElement = document.createElement("h2");
    nameElement.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    pokemonContainer.appendChild(nameElement);
    const imageElement = document.createElement("img");
    const spriteURL = pokemon.sprites.front_default;
    if (spriteURL) {
        imageElement.src = pokemon.sprites.front_default;
        imageElement.alt = pokemon.name;
        pokemonContainer.appendChild(imageElement);
    }
    else {
        console.log("Error, no image found!");
        const placeholderText = document.createElement("p");
        placeholderText.textContent = "No sprite found for this Pokémon!";
    }

    const pokemonIDElement = document.createElement("p");
    pokemonIDElement.textContet = `ID: ${pokemon.id}`;
    pokemonContainer.appendChild(pokemonIDElement);
    const heightElement = document.createElement("p");
    heightElement.textContent = `Height: ${pokemon.height / 10}m`;
    const weightElement = document.createElement("p");
    weightElement.textContent = `Weight: ${pokemon.weight / 10}kg`;
    const typeElement = document.createElement("p");
    const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(", ");
    typeElement.textContent = `Type: ${types}`
    pokemonContainer.appendChild(typeElement);
    const statElement = document.createElement("p");
    const stats = pokemon.stats.map(statInfo => statInfo.stat.name).join(", ")
    statElement.textContent = `Stats: ${stats}`;
    pokemonContainer.appendChild(statElement);
}

/*
async function playSound(pokemonID) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`);
        if (!response.ok) {
            throw new Error("Network did not respond with HTTP Code 200");
        }
        const species = await response.json();
        const soundURL = species.cries?.latest;
        if (soundURL) {
            const audio = new Audio(soundURL);
            audio.play().catch(error => console.error("Error playing the sound!", error));
        }
        else {
            console.error("No sound found for this pokemon!");
        }
    } catch (error) {
        console.error("Error fetching the sound from the API");
    }
}
*/