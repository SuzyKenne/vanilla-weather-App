function displayTemperature(response) {
    console.log(response.data.temperature.current);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let humidityElement = document.querySelector("#humidity");
    let pressureElement = document.querySelector("#pressure");
    let windElement = document.querySelector("#wind");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    humidityElement.innerHTML = response.data.temperature.humidity;
    pressureElement.innerHTML = response.data.temperature.pressure;
    windElement.innerHTML = Math.round(response.data.wind.speed);
}


let Key = "430030o1b1545b06bdd75tb02bbad91f";
let apiUrl =`https://api.shecodes.io/weather/v1/current?query=Paris&key=${Key}&units=metric`;


axios.get(apiUrl).then(displayTemperature);