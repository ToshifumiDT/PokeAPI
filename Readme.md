



Note for me.


1. 初期設定とイベントリスナーの追加

console.log("Hello World!");

const getPokemon = document.getElementById("get-pokemon");
getPokemon.addEventListener("click", fetchPokemon);

document.getElementById("search-input").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        fetchPokemonByName(event.target.value.toLowerCase());
    }
});

console.log("Hello World!"); はデバッグのためのもので、コンソールに "Hello World!" を表示します。
const getPokemon = document.getElementById("get-pokemon"); では、HTML要素（ボタン）を取得しています。
getPokemon.addEventListener("click", fetchPokemon); で、ボタンがクリックされたときに fetchPokemon 関数が呼び出されるようにしています。
document.getElementById("search-input").addEventListener("keyup", function (event) { ... }); は、検索入力フィールドに対してイベントリスナーを設定しています。Enterキーが押されたときに fetchPokemonByName 関数が呼び出され、入力されたポケモン名でポケモンデータを取得します。


2. ランダムなポケモンを取得する関数

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
        pokemonContainer.textContent = "Failed to get the requested Pokémon from the API, please try again.";
    } finally {
        loadingElement.style.display = "none";
    }
}

fetchPokemon 関数は、ランダムなポケモンを取得します。
loadingElement.style.display = "block"; は、ロード中であることをユーザーに示すために "loading" 要素を表示します。
pokemonContainer.textContent = ""; で、以前のポケモンデータをクリアします。
const randomID = Math.floor(Math.random() * 1010) + 1; で1から1010までのランダムなポケモンIDを生成します。
await fetch(...); でポケモンAPIからデータを取得します。
取得したデータを displayPokemonData 関数に渡して表示します。
例外が発生した場合は、エラーメッセージをコンソールに表示し、ユーザーにエラーを知らせます。
最後に、loadingElement.style.display = "none"; でロード中の表示を隠します。

3. 名前でポケモンを取得する関数

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
        pokemonContainer.textContent = "Failed to get the requested Pokémon from the API, please try again.";
    } finally {
        loadingElement.style.display = "none";
    }
}

fetchPokemonByName 関数は、名前を使ってポケモンを取得します。
基本的な流れは fetchPokemon 関数と同じです。

4. ポケモンデータを表示する関数

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
    } else {
        console.log("Error, no image found!");
        const placeholderText = document.createElement("p");
        placeholderText.textContent = "No sprite found for this Pokémon!";
        pokemonContainer.appendChild(placeholderText);
    }

    const pokemonIDElement = document.createElement("p");
    pokemonIDElement.textContent = `ID: ${pokemon.id}`;
    pokemonContainer.appendChild(pokemonIDElement);
    
    const heightElement = document.createElement("p");
    heightElement.textContent = `Height: ${pokemon.height / 10}m`;
    pokemonContainer.appendChild(heightElement);
    
    const weightElement = document.createElement("p");
    weightElement.textContent = `Weight: ${pokemon.weight / 10}kg`;
    pokemonContainer.appendChild(weightElement);
    
    const typeElement = document.createElement("p");
    const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(", ");
    typeElement.textContent = `Type: ${types}`;
    pokemonContainer.appendChild(typeElement);
    
    const statElement = document.createElement("p");
    const stats = pokemon.stats.map(statInfo => statInfo.stat.name).join(", ");
    statElement.textContent = `Stats: ${stats}`;
    pokemonContainer.appendChild(statElement);
}

displayPokemonData 関数は、取得したポケモンのデータをHTML要素として表示します。
ポケモンの名前、画像、ID、高さ、重さ、タイプ、ステータスを表示します。
各データは新しいHTML要素として作成され、pokemonContainer に追加されます。
このコードは、ポケモンのランダム検索や名前検索を可能にし、ユーザーにその情報を表示するシンプルなアプリケーションを作成します。