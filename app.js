const a = document.getElementById('div1');
const all = document.getElementById('all');
let p = document.querySelectorAll(".mi-elemento");

function pokeApi(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(response => {
            createPokemon(response);

        })
        .catch(error => console.log(error));
}


function fecthPokemon() {
    a.innerHTML = '';
    for (let i = 1; i <= 151; i++) {
        pokeApi(i);
    }
}

function createPokemon(pokemon) {
    let tipo = pokemon.types.map((type) => `<p class="${type.type.name}">${type.type.name}</p>`);
    let tipos = tipo.join(' ');
    a.innerHTML += `
    <div class="container">
      <span># ${pokemon.id}</span>
       <img src='${pokemon.sprites.front_default}'>
       <span>${pokemon.name}</span>
       <div>
          ${tipos}
       <div>
    </div>`;

}
fecthPokemon();

p.forEach(elemento => elemento.addEventListener("click", (event) => {
    
    const elemento = event.currentTarget.id;
    a.innerHTML = '';
    for (let i = 1; i <= 151; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(res => res.json())
            .then(response => {
                let b = response.types.map((type) => type.type.name);
                if (b.some(e => e.includes(elemento))) {
                    createPokemon(response);
                }
            })
            .catch(error => console.log(error));
    }

}));

all.addEventListener('click', fecthPokemon);



