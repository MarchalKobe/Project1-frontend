//#region ***  DOM references ***
let html_calendar, html_calendarDayNames, html_calendarDays, html_event;
let html_calendarButtonPrev, html_calendarButtonNext;
let html_calendarLabel;
let html_editor, html_editButton, html_editorEvent, html_editorData, html_editorClose, html_editorDelete, html_editorSafe, html_eventEditContent, html_eventEditContentError;
let calendarMonth, calendarYear;
//#endregion

//#region ***  Callback-Visualisation - show___ ***
const showCalendarInformation = function() {
    html_calendar = document.querySelector(".js-calendar");

    let date = new Date();

    let calendarHeader = `
    <div class="c-calendar__header">
        <button class="js-calendarButtonPrev c-calendar__header--prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 80"><path data-name="Polygon 1" d="M65.442 37.4a3 3 0 010 5.209L4.489 77.439A3 3 0 010 74.83V5.17a3 3 0 014.488-2.6z"/></svg></button>
        <p class="js-calendarLabel c-calendar__header--label">${getMonth(date.getMonth())} ${date.getFullYear()}</p>
        <button class="js-calendarButtonNext c-calendar__header--next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 80"><path data-name="Polygon 1" d="M65.442 37.4a3 3 0 010 5.209L4.489 77.439A3 3 0 010 74.83V5.17a3 3 0 014.488-2.6z"/></svg></button>
    </div>`;

    html_calendar.innerHTML = calendarHeader;

    let calendar = `
    <div class="c-calendar__days">
        <div class="js-calendarDayNames c-calendar__days--row">
            <div class="c-calendar__days--item">Maa</div>
            <div class="c-calendar__days--item">Din</div>
            <div class="c-calendar__days--item">Woe</div>
            <div class="c-calendar__days--item">Don</div>
            <div class="c-calendar__days--item">Vri</div>
            <div class="c-calendar__days--item">Zat</div>
            <div class="c-calendar__days--item">Zon</div>
        </div>

        <div class="js-calendarDays"></div>`;

    html_calendar.innerHTML += calendar;

    html_calendarDayNames = document.querySelector(".js-calendarDayNames");
    html_calendarDays = document.querySelector(".js-calendarDays");

    calendarMonth = date.getMonth();
    calendarYear = date.getFullYear();

    showCalendarDays(date.getMonth(), date.getFullYear());
    getCalendarEvents();
    listenToScreenSizeCalendar();
    listenToButtonClick();
};

const showCalendarDays = function(month, year) {
    let today = new Date();
    let firstDay = new Date(year, month, 1).getDay() - 1;
    let lastDay = new Date(year, month + 1, 0).getDay() - 1;
    let amountOfDays = new Date(year, month + 1, 0).getDate();

    if(firstDay == -1) {
        firstDay = 6;
    }

    if(lastDay == -1) {
        lastDay = 6;
    }

    let calendarDays = ``;

    let count = 1 - firstDay;
    let aantal = 1;

    while(count < amountOfDays) {
        calendarDays += `<div class="c-calendar__days--row">`;

        for(i = 1; i <= 7; i++) {
            if(count < amountOfDays + 1) {
                if(count < 1) {
                    calendarDays += `<div class="c-calendar__days--item"></div>`;
                } else {
                    if(today.getDate() == count && today.getMonth() == month && today.getFullYear() == year) {
                        if(aantal % 6 == 0 || aantal % 7 == 0) {
                            calendarDays += `<div class="c-calendar__days--item c-calendar__days--item-weekend c-calendar__days--item-now" data-day="${count}">${count}</div>`;
                        } else {
                            calendarDays += `<div class="c-calendar__days--item c-calendar__days--item-now" data-day="${count}">${count}</div>`;
                        }
                    } else {
                        if(aantal % 6 == 0 || aantal % 7 == 0) {
                            calendarDays += `<div class="c-calendar__days--item c-calendar__days--item-weekend" data-day="${count}">${count}</div>`;
                        } else {
                            calendarDays += `<div class="c-calendar__days--item" data-day="${count}">${count}</div>`;
                        }
                    }
                }
            } else {
                calendarDays += `<div class="c-calendar__days--item"></div>`;
            }
            
            count += 1;

            if(aantal > 6) {
                aantal = 1;
            } else {
                aantal += 1;
            }
        }

        calendarDays += `</div>`;
    }

    html_calendarDays.innerHTML = calendarDays;
};

`
<div class="c-calendar__days--row">
    <div class="c-calendar__days--item"></div>
    <div class="c-calendar__days--item"></div>
    <div class="c-calendar__days--item">1</div>
    <div class="c-calendar__days--item">2</div>
    <div class="c-calendar__days--item">3</div>
    <div class="c-calendar__days--item c-calendar__days--item-weekend">4</div>
    <div class="c-calendar__days--item c-calendar__days--item-weekend">5</div>
</div>
`;

const showCalenderDayNamesSmall = function() {
    let calendarDayNames = `
            <div class="c-calendar__days--item">M</div>
            <div class="c-calendar__days--item">D</div>
            <div class="c-calendar__days--item">W</div>
            <div class="c-calendar__days--item">D</div>
            <div class="c-calendar__days--item">V</div>
            <div class="c-calendar__days--item">Z</div>
            <div class="c-calendar__days--item">Z</div>`;
    
    html_calendarDayNames.innerHTML = calendarDayNames;
};

const showCalenderDayNamesFull = function() {
    let calendarDayNames = `
            <div class="c-calendar__days--item">Maa</div>
            <div class="c-calendar__days--item">Din</div>
            <div class="c-calendar__days--item">Woe</div>
            <div class="c-calendar__days--item">Don</div>
            <div class="c-calendar__days--item">Vri</div>
            <div class="c-calendar__days--item">Zat</div>
            <div class="c-calendar__days--item">Zon</div>`;
    
    html_calendarDayNames.innerHTML = calendarDayNames;
};

const showCalendarEvents = function(jsonObject) {
    for(const event of jsonObject.days) {
        const date = new Date(event.Datum);
        let day = String(date.getDate());
        let month = String(date.getMonth() + 1);
        const year = date.getFullYear();

        if(day.length == 1) {
            day = `0${day}`;
        };

        if(month.length == 1) {
            month = `0${month}`;
        };

        const fullDate = `${year}-${month}-${day}`;

        let eventDay = document.querySelector(`[data-day="${date.getDate()}"]`);
        eventDay.innerHTML = `<div class="c-calendar__days--item-event" data-date="${fullDate}">${date.getDate()}</div>`;
    };

    listenToEventButtons();
};

const showEvents = function(jsonObject) {
    html_event = document.querySelector(".js-event");
    const date = new Date(jsonObject.activiteiten[0].Datum);
    let day = String(date.getDate());
    let month = String(date.getMonth() + 1);
    const year = date.getFullYear();
    const monthName = getMonth(month - 1);

    if(month.length == 1) {
        month = `0${month}`;
    };

    if(day.length == 1) {
        day = `0${day}`;
    };
    
    let html = `
        <div class="c-event">
            <div class="c-event__date">
                <h2>${day}</h2>
                <h3>${monthName}</h3>
            </div>
            <div>
    `;

    for(const event of jsonObject.activiteiten) {
        const time = event.Datum.slice(event.Datum.indexOf(":") - 2, event.Datum.indexOf(":") + 6);
        const fullDate = `${year}-${month}-${day}T${time}`;
        let link = true;

        if(event.LinkID == null) {
            link = false;
        };
        
        html += `
            <div class="c-event__info">
                <h3>${event.Activiteit}</h3>
                <p>${time} uur</p>
                <a class="js-toggleEdit" data-id="${event.ActiviteitID}" data-event="${event.Activiteit}" data-date="${fullDate}" data-link="${link}">bewerken</a>
            </div>
        `;
    };

    html += `
            </div>
        </div>
    `;

    html_event.innerHTML = html;
    listenToEditButtonClick();
};

const showSafeButtonMessage = function(jsonObject) {
    html_eventEditContent = document.querySelector(".js-event-edit-content");
    html_eventEditContentError = document.querySelector(".js-event-edit-content-error");

    html_eventEditContent.style.display = "none";
    html_eventEditContentError.style.display = "inherit";
    html_eventEditContentError.innerHTML = jsonObject.message;

    const token = sessionStorage.getItem("token");

    if(jsonObject.date && token) {
        handleData(`http://${window.location.hostname}:5000/api/v1/activiteiten/${jsonObject.date}`, showEvents, null, "GET", null, token);
    };
};

const showSafeButtonError = function(jsonObject) {
    html_eventEditContent = document.querySelector(".js-event-edit-content");
    html_eventEditContentError = document.querySelector(".js-event-edit-content-error");

    html_eventEditContent.style.display = "none";
    html_eventEditContentError.style.display = "inherit";
    html_eventEditContentError.innerHTML = jsonObject.message;
};

const showDeleteButtonMessage = function(jsonObject) {
    html_eventEditContent = document.querySelector(".js-event-edit-content");
    html_eventEditContentError = document.querySelector(".js-event-edit-content-error");
    html_event = document.querySelector(".js-event");

    html_eventEditContent.style.display = "none";
    html_eventEditContentError.style.display = "inherit";
    html_eventEditContentError.innerHTML = jsonObject.message;

    showCalendarInformation();
    html_event.innerHTML = "";
};
//#endregion

//#region ***  Callback-No Visualisation - callback___  ***
//#endregion

//#region ***  Data Access - get___ ***
const getCalendarEvents = function() {
    month = String(calendarMonth + 1);

    if(month.length == 1) {
        month = `0${month}`;
    };

    date = `${calendarYear}-${month}`;
    
    const token = sessionStorage.getItem("token");
    
    if(token) {
        handleData(`http://${window.location.hostname}:5000/api/v1/activiteiten/${date}/days`, showCalendarEvents, null, "GET", null, token);
    };
};
//#endregion

//#region ***  Event Listeners - listenTo___ ***
const listenToScreenSizeCalendar = function() {
    if(window.innerWidth < 425) {
        showCalenderDayNamesSmall();
    } else {
        showCalenderDayNamesFull();
    };

    window.addEventListener("resize", function() {
        if(window.innerWidth < 425) {
            showCalenderDayNamesSmall();
        } else {
            showCalenderDayNamesFull();
        };
    });
}

const listenToButtonClick = function() {
    html_calendarButtonPrev = document.querySelector(".js-calendarButtonPrev");
    html_calendarButtonNext = document.querySelector(".js-calendarButtonNext");
    html_calendarLabel = document.querySelector(".js-calendarLabel");

    html_calendarButtonPrev.addEventListener("click", function() {
        date = new Date();
        calendarMonth -= 1;

        if(calendarMonth < 0) {
            calendarMonth = 11;
            calendarYear -= 1;
        }
        
        showCalendarDays(calendarMonth, calendarYear);
        html_calendarLabel.innerHTML = `${getMonth(calendarMonth)} ${calendarYear}`;
        getCalendarEvents();
    });

    html_calendarButtonNext.addEventListener("click", function() {
        date = new Date();
        calendarMonth += 1;

        if(calendarMonth > 11) {
            calendarMonth = 0;
            calendarYear += 1;
        }

        showCalendarDays(calendarMonth, calendarYear);
        html_calendarLabel.innerHTML = `${getMonth(calendarMonth)} ${calendarYear}`;
        getCalendarEvents();
    });
}

const listenToEventButtons = function() {
    const events = document.querySelectorAll(".c-calendar__days--item-event");

    for(const event of events) {
        event.addEventListener("click", function() {
            for(const event2 of events) {
                event2.classList.remove("c-calendar__days--item-event-selected");
            }

            this.classList.add("c-calendar__days--item-event-selected");
            const token = sessionStorage.getItem("token");

            if(token) {
                handleData(`http://${window.location.hostname}:5000/api/v1/activiteiten/${this.dataset.date}`, showEvents, null, "GET", null, token);
            };
        });
    };
};

const listenToEditButtonClick = function() {
    html_editor = document.querySelector(".js-editor");
    html_editButton = document.querySelectorAll(".js-toggleEdit");
    html_editorEvent = document.querySelector(".js-editorEvent");
    html_editorData = document.querySelector(".js-editorDate");
    html_editorClose = document.querySelector(".js-editorClose");
    html_editorDelete = document.querySelector(".js-editorDelete");
    html_editorSafe = document.querySelector(".js-editorSafe");
    html_eventEditContent = document.querySelector(".js-event-edit-content");
    html_eventEditContentError = document.querySelector(".js-event-edit-content-error");

    for(const button of html_editButton) {
        button.addEventListener("click", function() {
            html_editor.style.display = "inherit";

            if(this.dataset.link == "false") {
                html_eventEditContent.style.display = "inherit";
                html_eventEditContentError.style.display = "none";

                html_editorEvent.value = this.dataset.event;
                html_editorData.value = this.dataset.date;
                html_editorDelete.dataset.id = this.dataset.id;
                html_editorSafe.dataset.id = this.dataset.id;

                html_editorDelete.addEventListener("click", function() {
                    const token = sessionStorage.getItem("token");

                    if(token) {
                        handleData(`http://${window.location.hostname}:5000/api/v1/activiteiten/${this.dataset.id}`, showDeleteButtonMessage, null, "DELETE", null, token);
                    };
                });

                html_editorSafe.addEventListener("click", function() {
                    const info = {
                        event: html_editorEvent.value,
                        date: html_editorData.value
                    };

                    const token = sessionStorage.getItem("token");

                    if(token) {
                        handleData(`http://${window.location.hostname}:5000/api/v1/activiteiten/${this.dataset.id}`, showSafeButtonMessage, showSafeButtonError, "PUT", JSON.stringify(info), token);
                    };
                });
            } else {
                html_eventEditContent.style.display = "none";
                html_eventEditContentError.style.display = "inherit";
                html_eventEditContentError.innerHTML = "Deze activiteit is gelinkt aan een externe kalender en kan dus niet worden bewerkt."
            };
        });
    };

    html_editorClose.addEventListener("click", function(){
        html_editor.style.display = "none";
    });
};
//#endregion

//#region ***  INIT / DOMContentLoaded  ***
//#endregion