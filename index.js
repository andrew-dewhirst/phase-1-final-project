const pokemonData = 'http://localhost:3000/pokemon';
let arrayOfPokemon = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch(pokemonData)
  .then(response => response.json())
  .then(listOfPokemon => {
    arrayOfPokemon = [...listOfPokemon];
    //Display initial list of Pokemon upon page load
    displayList(arrayOfPokemon);
    //Click event for the Pokemon "search by" text boxes
    document.querySelector('.submit').addEventListener('click',filterBySearchTerm);
    //Click event to reset entire lineup
    document.querySelector('#reset-lineup-btn').addEventListener('click',clearLineup);
    //Click event to print final lineup to popup box
    const addBtn = document.querySelector("#create-lineup-btn");
    addBtn.addEventListener('click',printLineup)
    });
  });

//Display list of Pokemon, their sprites, and option to add to lineup when the page loads
function displayList(arrayOfPokemon){
  arrayOfPokemon.forEach(pokemon => {
    let pokemonInfo = document.createElement('div');
    pokemonInfo.className = 'list';

    let listing = document.createElement('h2');
    listing.textContent = pokemon.name;
    pokemonInfo.appendChild(listing);

    let sprite = document.createElement('img');
    sprite.src = pokemon.sprite;
    sprite.className = 'sprite';
    pokemonInfo.appendChild(sprite);

    let addButton = document.createElement('button');
    addButton.textContent = 'Add to Lineup';
    addButton.className = 'add-btn';
    addButton.addEventListener('click',displayCards);
    pokemonInfo.appendChild(addButton);

    document.querySelector('#pokemon-list').appendChild(pokemonInfo)
  });
};

//Filter initial list of Pokemon by name and type using search bar
function filterBySearchTerm(){
  let inputName = document.querySelector('#input-pokemon-name').value;
  let pokemonNames = arrayOfPokemon.filter(pokemon => pokemon.name.startsWith(inputName));

  let inputType = document.querySelector('#input-pokemon-type').value;
  let pokemonTypes = arrayOfPokemon.filter(pokemon => pokemon.primary_type.startsWith(inputType));

  if (inputName !== ""){
    document.querySelector('#pokemon-list').innerText = '';
    displayList(pokemonNames);
  } else if (inputType !== ""){
      document.querySelector('#pokemon-list').innerText = '';
      displayList(pokemonTypes);
  } else if (inputName == "" && inputType == ""){
      let pokemonList = document.querySelector('#pokemon-list');
      pokemonList.innerHTML = "";
      displayList(arrayOfPokemon);
  };
};

//Display full-sized card of the Pokemon once a user "adds" the Pokemon to their lineup
function displayCards(event){
    let testName  = event.target.parentNode;
    let pokeName = testName.querySelector('h2').textContent;
    arrayOfPokemon.forEach(pokemon => {
      if (pokeName == pokemon.name){
        let pokemonCard = document.createElement('div');
        pokemonCard.className = ('card');

        let h2 = document.createElement('h2');
        h2.textContent = pokemon.name;
        pokemonCard.appendChild(h2);

        let img = document.createElement('img');
        img.src = pokemon.image;
        img.classList = 'pokemon-avatar';
        pokemonCard.appendChild(img);

        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove From Lineup';
        removeButton.className = 'remove-btn';
        removeButton.id = pokemon.id;
        removeButton.addEventListener('click',(event) => event.target.parentNode.remove());
        pokemonCard.appendChild(removeButton);

        document.querySelector('#pokemon-collection').appendChild(pokemonCard);
    };
  });
};

//Pop up box showing final lineup of Pokemon
function printLineup(){
  let allCards = Array.from(document.querySelectorAll('.card'));
  let finalLineup = allCards.map(card => {
    return (`${card.firstChild.innerText}`);
  })
  alert(`Your starting lineup is: ${finalLineup} `);
};

//Clears lineup of Pokemon
function clearLineup(){
  let pokemonLineup = document.querySelector('#pokemon-collection');
  pokemonLineup.innerHTML = "";
};