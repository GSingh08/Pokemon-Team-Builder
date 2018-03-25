let getReponseAsJSON = url => {
  return fetch(url).then(response => response.json());
};

let currentPage = 1;

let displayPokemonList = () => {
  // Get the array of the character's list using the getReponseAsJSON function
  getReponseAsJSON(
    "https://pokeapi.co/api/v2/pokemon/" + currentPage + "&pageSize=1=="
  ).then(json => {
    // Loop over the characters
    for (let i = 0; i < json.length; i++) {
      // Create a DOM element for the character

      // Append the character name to its DOM element
      pokemonElement.innerHTML = json[i].name;
      // Append the character element to the .character-container
      let characterContainerElement = document.querySelector(
        ".pokemon-container"
      );
      characterContainerElement.appendChild(characterElement);
    }
  });
};

displayPokemonList();

console.log("hello");
