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

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    let days = ["wed", "Thu", "Fri", "Sat", "Sun"];
    days.forEach(function(day) {
      forecastHTML = forecastHTML + 
     `
        <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
            <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png"
                alt=""
                width="42"
            />
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">18°</span>
                <span class="weather-forecast-temperature-min">12°</span>
            </div>
        </div>`;
        
    }
    );
    forecastHTML =forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
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

    celsiusTemperature = response.data.temperature.current;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
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


function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    //remove the active class from the celsius element
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheint = (celsiusTemperature + 9)/ 5 + 32;
    
    temperatureElement.innerHTML = Math.round(fahrenheint);
}


function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

displayForecast();