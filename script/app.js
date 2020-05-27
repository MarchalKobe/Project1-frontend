//#region ***  DOM references ***
let html_logoutButton;
//#endregion

//#region ***  Callback-Visualisation - show___ ***
const showLogoutButton = function() {
    html_logoutButton = document.querySelectorAll(".js-login-header");

    for(const knop of html_logoutButton) {
        knop.innerHTML = "Afmelden";
    }

    listenToLogoutButtons();
};
//#endregion

//#region ***  Callback-No Visualisation - callback___  ***
//#endregion

//#region ***  Data Access - get___ ***
const getDay = function(day) {
    const days = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];
    return days[day - 1];
};

const getMonth = function(month) {
    const months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
    return months[month];
};

const getDate = function() {
    const today = new Date();
    const year = String(today.getFullYear());
    let month = String(today.getMonth() + 1);
    let day = String(today.getDate());

    if(month.length == 1) {
        month = `0${month}`;
    }

    if(day.length == 1) {
        day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
};
//#endregion

//#region ***  Event Listeners - listenTo___ ***
const listenToLogoutButtons = function() {
    for(const knop of html_logoutButton) {
        knop.addEventListener("click", function() {
            sessionStorage.removeItem("token");
        });
    }
};
//#endregion

//#region ***  INIT / DOMContentLoaded  ***
const toggleNav = function() {
    const toggleTrigger = document.querySelectorAll(".js-toggle-nav");

    for(let i = 0; i < toggleTrigger.length; i++) {
        toggleTrigger[i].addEventListener("click", function() {
            document.querySelector("body").classList.toggle("has-mobile-nav");
        });
    };
};

const init = function() {
    toggleNav();

    if(document.querySelector(".js-time")) {
        showTime();
        showDate();
        getCity();
    };

    if(document.querySelector(".js-temperatuur")) {
        const date = getDate();
        getValuesTemperatuur(date);
    };

    if(document.querySelector(".js-luchtkwaliteit")) {
        const date = getDate();
        getValuesLuchtkwaliteit(date);
    };

    if(document.querySelector(".js-login")) {
        listenToSubmitButton();
    };

    const token = sessionStorage.getItem("token");

    if(token) {
        showLogoutButton();
    };
};

document.addEventListener("DOMContentLoaded", init);
//#endregion