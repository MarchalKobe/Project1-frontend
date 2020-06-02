//#region ***  DOM references ***
let html_addEvent, html_addEventButton, html_event, hmtl_date;
//#endregion

//#region ***  Callback-Visualisation - show___ ***
const showAddEventMessage = function(jsonObject) {
    html_addEvent = document.querySelector(".js-add-event");
    html_addEvent.innerHTML = `
        <h2 class="c-content__subtitle">Activiteit</h2>
        <p>Activiteit succesvol toegevoegd aan de kalender</p>
    `;
};
//#endregion

//#region ***  Callback-No Visualisation - callback___  ***
//#endregion

//#region ***  Data Access - get___ ***
//#endregion

//#region ***  Event Listeners - listenTo___ ***
const listenToAddEventButton = function() {
    html_addEventButton = document.querySelector(".js-add-button");
    html_event = document.querySelector(".js-event");
    html_date = document.querySelector(".js-date");

    html_addEventButton.addEventListener("click", function() {
        const event = html_event.value;
        const date = html_date.value;

        const data = {
            event: event,
            date: date
        };

        handleData("http://192.168.0.120:5000/api/v1/activiteiten", showAddEventMessage, null, "PUT", JSON.stringify(data));
    });
};
//#endregion

//#region ***  INIT / DOMContentLoaded  ***
//#endregion