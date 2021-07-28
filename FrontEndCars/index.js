"use strict";

    const baseURL = "http://localhost:8080";


    const getAllOutput = document.querySelector("#getAllOutput");
    const getCarByIDOutput = document.querySelector('#getCarByIDOutput');
    const carID = document.querySelector('#idOfCar');


    const getAllCars = () => {
        axios.get(`${baseURL}/getAllCars`)
            .then(res => {
                const cars = res.data;

                getAllOutput.innerHTML = "";

                cars.forEach(car => renderCars(car, getAllOutput));
            }).catch(err => console.log(err));
    }


    const renderCars = (car, outputDiv) => {
        const newCar = document.createElement('div');


        const carBrand = document.createElement("h3");
        carBrand.innerText = `Brand: ${car.brand}`;
        newCar.appendChild(carBrand);


        const carModel = document.createElement("p");
        carModel.innerText = `Model: ${car.model}`;
        newCar.appendChild(carModel);


        const carAge = document.createElement("p");
        carAge.innerText = `Age: ${car.age}`;
        newCar.appendChild(carAge);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = "DELETE";
        deleteButton.addEventListener('click', () => deleteCar(car.id));
        newCar.appendChild(deleteButton);

        outputDiv.appendChild(newCar);

    }


    const submitID = () => {
        const id = document.querySelector('#idOfCar');

        axios.get(`${baseURL}/getSpecificCar/${id.value}`)
            .then(res => {
                const car = res.data;
                getCarByIDOutput.innerHTML = "";
                renderCars(car, getCarByIDOutput)

            }).catch(err => console.log(err));

    }

    document.querySelector("section#getCarByID > button").addEventListener('click', submitID);

    const carForm = document.querySelector("section#postSection > form");
    carForm.addEventListener('submit', function (e) {
        e.preventDefault(); 


        const data = {
            brand: this.brand.value,
            model: this.model.value,
            age: this.age.value,
        }

        axios.post(`${baseURL}/createCar`, data)
            .then(function (res) {
                console.log(res);
                getAllCars();
                carForm.reset();
                carForm.brand.focus();
                alert("Form has been successfully submitted!");

            }).catch(err => console.log(err));

    });

    const deleteCar = id => {

        axios.delete(`${baseURL}/deleteCar/${id}`)
            .then(res => {
                console.log(res);
                getAllCars();

            }).catch(err => console.log(err));
    }

    getAllCars();
