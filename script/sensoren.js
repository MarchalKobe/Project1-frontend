//#region ***  DOM references ***
let chartDate, chartLabel, chartBackgroundColor, chartBorderColor, chartTickSymbol, chartType;
let html_chart, html_chartDate, html_chartPrev, html_chartNext, html_sensor;
//#endregion

//#region ***  Callback-Visualisation - show___ ***
const showChart = function(jsonObject) {
    html_chartDate = document.querySelector(".js-chartDate");
    html_chartDate.value = chartDate;

    let labels = [];
    let data = [];

    if(chartLabel == "Temperatuur") {
        chartType = "line";
        chartBackgroundColor = "rgba(244, 137, 20, 0.3)";
        chartBorderColor = "rgba(244, 137, 20, 1)";
    } else {
        chartType = "bar";
        chartBackgroundColor = [];
        chartBorderColor = [];
    };

    for(let waarde of jsonObject.sensor_waarden) {

        let fullDate = waarde.Datum;
        let time = fullDate.slice(fullDate.indexOf(":") - 2, fullDate.indexOf(":") + 6);

        labels.push(time);
        data.push(waarde.Waarde);

        if(chartLabel == "Luchtkwaliteit") {
            if(waarde.Waarde > 700) {
                chartBackgroundColor.push("rgba(210, 33, 45, 0.3)");
                chartBorderColor.push("rgba(210, 33, 45, 0.6)");
            } else if (waarde.Waarde > 300) {
                chartBackgroundColor.push("rgba(247, 191, 2, 0.3)");
                chartBorderColor.push("rgba(247, 191, 2, 1)");
            } else {
                chartBackgroundColor.push("rgba(45, 136, 36, 0.3)");
                chartBorderColor.push("rgba(45, 136, 36, 0.6)");
            };
        };
    }

    const ctx = document.querySelector(".js-chart").getContext('2d');
    const myChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                fill: false,
                label: chartLabel,
                data: data,
                backgroundColor: chartBackgroundColor,
                borderColor: chartBorderColor,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
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
    chartTickSymbol = "°";

    const token = sessionStorage.getItem("token");

    if(token) {
        handleData(`http://192.168.0.120:5000/api/v1/sensoren/3/${date}`, showChart, null, "GET", null, token);
        listenToChartDateChange();
        listenToChartResizeScreen();
    } else {
        showNotLoggedIn();
    };
};

const getValuesLuchtkwaliteit = function(date) {
    chartDate = date;
    chartLabel = "Luchtkwaliteit";
    chartTickSymbol = "";

    const token = sessionStorage.getItem("token");

    if(token) {
        handleData(`http://192.168.0.120:5000/api/v1/sensoren/2/${date}`, showChart, null, "GET", null, token);
        listenToChartDateChange();
        listenToChartResizeScreen();
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

const listenToChartResizeScreen = function() {
    html_chart = document.querySelector(".js-chart");

    window.addEventListener("resize", function() {
        if(window.innerWidth <= 768) {
            html_chart.height = 800;
            console.log("test");
        };
    });
};
//#endregion

//#region ***  INIT / DOMContentLoaded  ***
//#endregion