const cars = JSON.parse(localStorage.getItem('cars')) || [];

let updating = false;
let updatingId = -1;

//Imprimir elementos
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
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button onclick="enableUpdateCar(${car.id})" type="button" class="btn btn-outline-warning">Actualizar</button>
                            <button onclick="deleteCar(${car.id})" type="button" class="btn btn-outline-danger">Eliminar</button>
                        </div>
                    </td>
                </tr>`;
    });
    container.innerHTML = html;
}

//Agregar elementos
function addCar() {
    //si el valor de updating es verdadero se activara la funcion de actualizar
    if(updating) {
        updateCar();
        return;
    }

    const brand = document.getElementById('brand').value,
          model = document.getElementById('model').value,
          year = document.getElementById('year').value,
          color = document.getElementById('color').value,
          price = document.getElementById('price').value;
    let id = 1;

    if(cars.length > 0) {
        id = cars[cars.length-1].id+1;
    }

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

    localStorage.setItem('cars', JSON.stringify(cars));
    
    document.getElementById('car-form').reset();
}

//Eliminar elementos
const deleteCar = (id) => {
    const index = cars.findIndex((car) => car.id === id);
    cars.splice(index, 1);
    
    printCars();
}

//Activamos las funciones del update
const enableUpdateCar = (id) => {
    updatingId = id;
    const car = cars.find((car) => car.id === id)

    document.getElementById('brand').value = car.brand;
    document.getElementById('model').value = car.model;
    document.getElementById('year').value = car.year;
    document.getElementById('color').value = car.color;
    document.getElementById('price').value = car.price;

    updating = true;

    //modifica y agrega propiedades de los botones
    const button = document.getElementById('save');
          button.textContent = 'Actualizar';
          button.classList.remove('btn-outline-success');
          button.classList.add('btn-outline-warning');
    document.getElementById('cancel').classList.remove('d-none');
}

//Cancelar funciones del update
const cancelUpdateCar = () => {
    document.getElementById('car-form').reset();

    updating = false;
    updatingId = -1;

    //devuelve los botones a su estado original
    const button = document.getElementById('save');
          button.textContent = 'Agregar';
          button.classList.add('btn-outline-success');
          button.classList.remove('btn-outline-warning');
    document.getElementById('cancel').classList.add('d-none');
}

//Actualizar elementos
const updateCar = () => {
    const car = cars.find((car) => car.id === updatingId)

    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const color = document.getElementById('color').value;
    const price = document.getElementById('price').value;

    car.brand = brand;
    car.model = model;
    car.year = year;
    car.color = color;
    car.price = price;

    printCars();
    document.getElementById('car-form').reset();
    cancelUpdateCar();
}

printCars();