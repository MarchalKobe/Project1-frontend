//#region ***  DOM references ***
let html_time, html_date, html_temp;
//#endregion

//#region ***  Callback-Visualisation - show___ ***
const showTime = function() {
    html_time = document.querySelector(".js-time");

    const date = new Date();
    const time = getTime(date.getHours());

    html_time.innerHTML = `${time}`;
};

const showDate = function() {
    html_date = document.querySelector(".js-date");

    const date = new Date();
    const day = getDay(date.getDay());
    const dateNumber = date.getDate();
    const month = getMonth(date.getMonth());
    const year = date.getFullYear();

    html_date.innerHTML = `${day} ${dateNumber} ${month} ${year}`;
};

const showTemp = function(jsonObject) {
    html_temp = document.querySelector(".js-temp");

    let desc = jsonObject.weather[0].description;
    const temp = jsonObject.main.temp;

    desc = desc.charAt(0).toUpperCase() + desc.slice(1);

    html_temp.innerHTML = `${desc} ${temp}°C`;
};
//#endregion

//#region ***  Callback-No Visualisation - callback___  ***
//#endregion

//#region ***  Data Access - get___ ***
const getTime = function(time) {
    if(time <= 11) {
        return "morgen";
    } else if(time > 11 && time <= 17) {
        return "middag";
    } else {
        return "avond";
    }
};

const getCity = function() {
    handleData("https://ipinfo.io/json?token=03726150ef306e", getTemp);
};

const getTemp = function(jsonObject) {
    const city = jsonObject.city;
    const country = jsonObject.country;

    handleData(`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=8e9e0976b8da3f1eec951cbe6bab417e&units=metric&lang=nl`, showTemp);
};
//#endregion

//#region ***  Event Listeners - listenTo___ ***
//#endregion

//#region ***  INIT / DOMContentLoaded  ***
//#endregion