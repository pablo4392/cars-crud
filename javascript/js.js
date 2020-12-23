const cars = [
    {
        id: 0,
        brand: "Nissan",
        model: "Versa",
        year: 2016,
        color: "blanco",
        price: "90,000.00"
    }
];


//funcion para imprimir los elementos agregados
function printCars() {
    const container = document.getElementById('container-cars');
    let html = '';
    cars.forEach((car) => {
        html += `<tr>
                    <td>${car.id}</td>
                    <td>${car.brand}</td>
                    <td>${car.model}</td>
                    <td>${car.year}</td>
                    <td>${car.color}</td>
                    <td>${car.price}</td>
                    <td>
                        <button onclick="deleteCar(${car.id})" class="btn btn-outline-danger">
                            Eliminar
                        </button>
                    </td>
                </tr>`;
    });
    container.innerHTML = html;
}

//funcion para eliminar elementos
function deleteCar(id) {
    const index = cars.findIndex((car) => car.id == id);
    cars.splice(index, 1);

    printCars();
}

//funcion para agregar nuevos elementos
function addCar() {
    const brand = document.getElementById('brand').value,
          model = document.getElementById('model').value,
          year = document.getElementById('year').value,
          color = document.getElementById('color').value,
          price = document.getElementById('price').value;

    const id = cars[cars.length-1].id+1;

    const newCar = {
        id,
        brand,
        model,
        year,
        color,
        price
    }
    cars.push(newCar);
    printCars();
    
    document.getElementById('car-form').reset();
}
 printCars();
