const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header")
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`); //map da array de lo que le pidamos 
    tipos = tipos.join(''); // armo string con 1 o 2 tipos
    // un array por cada pokemon. Dentro de ese array debo entrar a cada propiedad y sacar el type. types -> cada uno de los type -> entrar al name de ese type.    
    // map va por cada uno de los type de types, y trae type.type.name. Devuelve array con el o los type de cada pokemon. 

    // poner 00 o 0 a numeros de 1 o 2 digitos
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    
    listaPokemon.append(div);
}


botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";  // vacia lista de pokemons
    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if (botonId === "ver-todos") {
                        mostrarPokemon(data);
                    } else {
                        const tipos = data.types.map(type => type.type.name); // para cada pokemon guarda en constante tipos un array con los tipos de cada pokemon
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data)
                    } //Busca en los arrays si algun tipo de pokemon incluye el botonId (tipo marcado)
                }
                

            })
    }
}))

