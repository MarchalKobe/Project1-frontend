//#region ***  DOM references ***
let html_calendar, html_calendarDayNames, html_calendarDays, html_event;
let html_calendarButtonPrev, html_calendarButtonNext;
let html_calendarLabel;
let calendarMonth, calendarYear;
//#endregion

//#region ***  Callback-Visualisation - show___ ***
const showCalendarInformation = function() {
    html_calendar = document.querySelector(".js-calendar");

    let date = new Date();

    let calendarHeader = `
    <div class="c-calendar__header">
        <button class="js-calendarButtonPrev c-calendar__header--prev">&#9664;</button>
        <p class="js-calendarLabel c-calendar__header--label">${getMonth(date.getMonth())} ${date.getFullYear()}</p>
        <button class="js-calendarButtonNext c-calendar__header--next">&#9664;</button>
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
            day = `0${month}`;
        };

        if(month.length == 1) {
            month = `0${month}`;
        };

        const fullDate = `${year}-${month}-${day}`;

        let eventDay = document.querySelector(`[data-day="${day}"]`);
        eventDay.innerHTML = `<div class="c-calendar__days--item-event" data-date="${fullDate}">${day}</div>`;
    };

    listenToEventButtons();
};

const showEvents = function(jsonObject) {
    html_event = document.querySelector(".js-event");
    const date = new Date(jsonObject.activiteiten[0].Datum);
    let day = String(date.getDate());
    const month = getMonth(date.getMonth());

    if(day.length == 1) {
        day = `0${month}`;
    };
    
    let html = `
        <div class="c-event">
            <div class="c-event__date">
                <h2>${day}</h2>
                <h3>${month}</h3>
            </div>
            <div>
    `;

    for(const event of jsonObject.activiteiten) {
        html += `
            <div class="c-event__info">
                <h3>${event.Activiteit}</h3>
                <p>${event.Datum.slice(event.Datum.indexOf(":") - 2, event.Datum.indexOf(":") + 6)} uur</p>
            </div>
        `;
    };

    html += `
            </div>
        </div>
    `;

    html_event.innerHTML = html;
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
    
    handleData(`http://192.168.0.120:5000/api/v1/activiteiten/${date}/days`, showCalendarEvents);
};
//#endregion

//#region ***  Event Listeners - listenTo___ ***
const listenToScreenSizeCalendar = function() {
    window.addEventListener("resize", function() {
        if(window.innerWidth < 425) {
            showCalenderDayNamesSmall();
        } else {
            showCalenderDayNamesFull();
        }
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
            handleData(`http://192.168.0.120:5000/api/v1/activiteiten/${this.dataset.date}`, showEvents);
        });
    };
};
//#endregion

//#region ***  INIT / DOMContentLoaded  ***
//#endregion