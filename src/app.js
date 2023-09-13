function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if(hours<10){
        hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if(minutes<10){
        minutes = `0${minutes}`
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Satursday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}



function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let humidityElement = document.querySelector("#humidity");
    let pressureElement = document.querySelector("#pressure");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    humidityElement.innerHTML = response.data.temperature.humidity;
    pressureElement.innerHTML = response.data.temperature.pressure;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.time * 1000);
}


let Key = "430030o1b1545b06bdd75tb02bbad91f";
let apiUrl =`https://api.shecodes.io/weather/v1/current?query=Buea&key=${Key}&units=metric`;
console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);