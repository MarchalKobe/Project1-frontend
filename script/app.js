//#region ***  DOM references ***
//#endregion

//#region ***  Callback-Visualisation - show___ ***
//#endregion

//#region ***  Callback-No Visualisation - callback___  ***
//#endregion

//#region ***  Data Access - get___ ***
//#endregion

//#region ***  Event Listeners - listenTo___ ***
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
};

document.addEventListener("DOMContentLoaded", init);
//#endregion