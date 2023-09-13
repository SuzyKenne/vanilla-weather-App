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
    let descriptionElement = document.querySelector("#description");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    humidityElement.innerHTML = response.data.temperature.humidity;
    pressureElement.innerHTML = response.data.temperature.pressure;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    descriptionElement.innerHTML = response.data.condition.description;
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconElement.setAttribute ("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`); 
}

function search(city) {
    let Key = "430030o1b1545b06bdd75tb02bbad91f";
    let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${Key}&units=metric`;
    console.log(apiUrl);

    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);