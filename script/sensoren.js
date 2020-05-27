//#region ***  DOM references ***
let chartDate, chartLabel, chartBackgroundColor, chartBorderColor, chartTickSymbol;
let html_chartDate, html_chartPrev, html_chartNext, html_sensor;
//#endregion

//#region ***  Callback-Visualisation - show___ ***
const showChart = function(jsonObject) {
    html_chartDate = document.querySelector(".js-chartDate");
    html_chartDate.value = chartDate;

    let labels = [];
    let data = [];

    for(let waarde of jsonObject.sensor_waarden) {

        let fullDate = waarde.Datum;
        let time = fullDate.slice(fullDate.indexOf(":") - 2, fullDate.indexOf(":") + 6);

        labels.push(time);
        data.push(waarde.Waarde);
    }

    const ctx = document.querySelector(".js-chart").getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: chartLabel,
                data: data,
                backgroundColor: chartBackgroundColor,
                borderColor: chartBorderColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        responsive: true,
                        beginAtZero: true,
                        callback: function(value, index, values) {
                            return value + chartTickSymbol;
                        }
                    }
                }]
            }
        }
    });
};

const showNotLoggedIn = function() {
    html_sensor = document.querySelector(".js-sensor");

    html_sensor.innerHTML = `
        <div class="c-login-fault">
            <h2 class="c-login-fault__title">Je moet aangemeld zijn!</h2>
            <p class="c-login-fault__text">Om deze pagina te bezoeken moet je aangemeld zijn.</p>
            <a href="/aanmelden.html">Aanmelden</a>
        </div>
    `;
};
//#endregion

//#region ***  Callback-No Visualisation - callback___  ***
//#endregion

//#region ***  Data Access - get___ ***
const getValuesTemperatuur = function(date) {
    chartDate = date;
    chartLabel = "Temperatuur";
    chartBackgroundColor = "rgba(255, 255, 0, 0.2)";
    chartBorderColor = "rgba(255, 255, 0, 1)";
    chartTickSymbol = "°";

    const token = sessionStorage.getItem("token");

    if(token) {
        handleData(`http://192.168.0.120:5000/api/v1/sensoren/3/${date}`, showChart, null, "GET", null, token);
        listenToChartDateChange();
    } else {
        showNotLoggedIn();
    };
};

const getValuesLuchtkwaliteit = function(date) {
    chartDate = date;
    chartLabel = "Luchtkwaliteit";
    chartBackgroundColor = "rgba(54, 162, 235, 0.2)";
    chartBorderColor = "rgba(54, 162, 235, 1)";
    chartTickSymbol = "";

    const token = sessionStorage.getItem("token");

    if(token) {
        handleData(`http://192.168.0.120:5000/api/v1/sensoren/2/${date}`, showChart, null, "GET", null, token);
        listenToChartDateChange();
    } else {
        showNotLoggedIn();
    };
};
//#endregion

//#region ***  Event Listeners - listenTo___ ***
const listenToChartDateChange = function() {
    html_chartDate = document.querySelector(".js-chartDate");

    html_chartDate.addEventListener("change", function() {
        let newDate = html_chartDate.value;
        console.log(newDate);
        if(chartLabel == "Temperatuur") {
            getValuesTemperatuur(newDate);
        } else {
            getValuesLuchtkwaliteit(newDate);
        };
    });
};
//#endregion

//#region ***  INIT / DOMContentLoaded  ***
//#endregion