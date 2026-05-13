let input = document.getElementById("pokemonInput");
let searchBtn = document.getElementById("searchBtn");
let result = document.getElementById("result");

async function getPokemon() {

  let name = input.value.toLowerCase().trim();

  if (name === "") {
    result.innerHTML = "Please enter a Pokémon name";
    return;
  }

  result.innerHTML = "Loading...";

  try {

    let response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );

    if (!response.ok) {
      throw new Error("Pokémon not found");
    }

    let data = await response.json();

    result.innerHTML = `
      <div class="pokemon-card">
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.front_default}" />
        <p>Height: ${data.height}</p>
        <p>Weight: ${data.weight}</p>
        <p>Type: ${data.types[0].type.name}</p>
      </div>
    `;

  } catch (error) {
    result.innerHTML = "❌ Pokémon not found";
  }
}

searchBtn.addEventListener("click", getPokemon);
