'use strict';
const pokemonTBody = document.getElementById('pokemonTBody');
const pokemonForm = document.forms['pokemonForm'];

let pokemons;

const createPokemon = (e) => {
    e.preventDefault();
    const name = pokemonForm['name'].value;
    const generation = pokemonForm['generation'].value;
    const category = pokemonForm['category'].value;
    const type = pokemonForm['type'].value;
    const image = pokemonForm['image'].value;

    pokemons = [...pokemons, { name, generation, category, type, image }];
    localStorage.setItem('pokemonsCrud', JSON.stringify(pokemons));
    readPokemons();
    pokemonForm.reset();
};

const readPokemons = () => {
    pokemonTBody.innerHTML = '';

    pokemons.forEach((element, index) => {
        const { name, generation, category, type, image } = element;

        const typePokemon = {
            "Fuego": "badge text-bg-danger",
            "Agua": "badge text-bg-primary",
            "Planta": "badge text-bg-success",
            "Veneno": "badge text-bg-secondary",
            "Bicho": "badge text-bg-info",
            "Eléctrico": "badge text-bg-warning",
        };

        // pokemonTBody.innerHTML += `
        //     <tr>
        //         <td>${index + 1}</td>
        //         <td>${name}</td>
        //         <td>${generation}</td>
        //         <td>${category}</td>
        //         <td><span class="${typePokemon[type]}">${type}</span></td>
        //         <td><img src="${image}" alt="${name}" width="64"></td>
        //         <td><button class="btn btn-outline-danger btn-sm" onClick=deletePokemon(${index})>❌</button></td>
        //     </tr>
        // `;

        const tableRow = document.createElement('tr');

        const tableDataId = document.createElement('td');
        tableDataId.textContent = index + 1;

        const tableDataName = document.createElement('td');
        tableDataName.textContent = name;

        const tableDataGeneration = document.createElement('td');
        tableDataGeneration.textContent = generation;

        const tableDataCategory = document.createElement('td');
        tableDataCategory.textContent = category;

        const tableDataType = document.createElement('td');
        const spanType = document.createElement('span');
        spanType.setAttribute('class', typePokemon[type]);
        spanType.textContent = type;
        tableDataType.appendChild(spanType);

        const tableDataImage = document.createElement('td');
        const imgImage = document.createElement('img');
        imgImage.setAttribute('src', image);
        imgImage.setAttribute('alt', name);
        imgImage.setAttribute('width', '64px');
        imgImage.setAttribute('height', '64px');
        tableDataImage.appendChild(imgImage);

        const tableDataActions = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-outline-danger btn-sm';
        deleteButton.textContent = '🗑';
        deleteButton.addEventListener('click', () => deletePokemon(index))
        tableDataActions.appendChild(deleteButton);

        tableRow.appendChild(tableDataId);
        tableRow.appendChild(tableDataName);
        tableRow.appendChild(tableDataGeneration);
        tableRow.appendChild(tableDataCategory);
        tableRow.appendChild(tableDataType);
        tableRow.appendChild(tableDataImage);
        tableRow.appendChild(tableDataActions);

        pokemonTBody.appendChild(tableRow);

    });
};

// const deletePokemon = (id) => {
//     pokemons = pokemons.filter((_, index) => index != id);
//     localStorage.setItem('pokemonsCrud', JSON.stringify(pokemons));
//     readPokemons();
// };

const deletePokemon = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success mx-1',
            cancelButton: 'btn btn-danger mx-1'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: '¿Estás seguro?',
        text: "No podrás recuperarlo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Sí, elimínalo!',
        cancelButtonText: 'No, cancélalo!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            pokemons = pokemons.filter((_, index) => index !== id);
            localStorage.setItem('pokemonsCrud', JSON.stringify(pokemons));
            readPokemons();
            swalWithBootstrapButtons.fire(
                '¡Eliminado!',
                'Tu Pokémon ha sido eliminado',
                'success'
            )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'Tu Pokémon está seguro',
                'error'
            )
        }
    })
};

if (localStorage.getItem('pokemonsCrud')) {
    pokemons = JSON.parse(localStorage.getItem('pokemonsCrud'));
} else {
    pokemons = [
        { name: 'Charmander', generation: 'Primera', category: 'Lagartija', type: 'Fuego', image: 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/5/56/latest/20200307023245/Charmander.png/200px-Charmander.png' },
        { name: 'Charmeleon', generation: 'Primera', category: 'Llama', type: 'Fuego', image: 'https://images.wikidexcdn.net/mwuploads/wikidex/e/ef/Charmeleon_en_la_primera_generaci%C3%B3n.png' },
        { name: 'Charizard', generation: 'Primera', category: 'Llama', type: 'Fuego', image: 'https://images.wikidexcdn.net/mwuploads/wikidex/9/95/latest/20160817212623/Charizard.png' },
        { name: 'Bulbasaur', generation: 'Primera', category: 'Semilla', type: 'Planta', image: 'https://images.wikidexcdn.net/mwuploads/wikidex/4/43/latest/20190406170624/Bulbasaur.png' },
        { name: 'Ivysaur', generation: 'Primera', category: 'Semilla', type: 'Planta', image: 'https://images.wikidexcdn.net/mwuploads/wikidex/8/86/Ivysaur.png' },
        { name: 'Venusaur', generation: 'Primera', category: 'Semilla', type: 'Planta', image: 'https://images.wikidexcdn.net/mwuploads/wikidex/b/be/latest/20160309230456/Venusaur.png' },
        { name: 'Squirtle', generation: 'Primera', category: 'Tortuguita', type: 'Agua', image: 'https://images.wikidexcdn.net/mwuploads/wikidex/e/e3/latest/20160309230820/Squirtle.png' },
        { name: 'Wartortle', generation: 'Primera', category: 'Tortuga', type: 'Agua', image: 'https://images.wikidexcdn.net/mwuploads/wikidex/d/d7/latest/20200307022248/Wartortle.png' },
        { name: 'Blastoise', generation: 'Primera', category: 'Amazón', type: 'Agua', image: 'https://images.wikidexcdn.net/mwuploads/wikidex/4/41/latest/20200411222955/Blastoise.png' },
    ];
    localStorage.setItem('pokemonsCrud', JSON.stringify(pokemons));
}

pokemonForm.addEventListener('submit', createPokemon);
readPokemons();


// window.addEventListener('DOMContentLoaded', () => {

// });