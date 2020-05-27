//#region ***  DOM references ***
let html_username, html_password, html_submit, html_login, html_loggedIn;
//#endregion

//#region ***  Callback-Visualisation - show___ ***
const showAangemeld = function(jsonObject) {
    sessionStorage.setItem("token", jsonObject.access_token);
    document.location.href = "/";
};

const showError = function(jsonObject) {
    html_login = document.querySelector(".js-login");

    html_login.innerHTML = "Error";
};
//#endregion

//#region ***  Callback-No Visualisation - callback___  ***
//#endregion

//#region ***  Data Access - get___ ***
//#endregion

//#region ***  Event Listeners - listenTo___ ***
const listenToSubmitButton = function() {
    html_username = document.querySelector(".js-username");
    html_password = document.querySelector(".js-password");
    html_submit = document.querySelector(".js-submit");
    html_login = document.querySelector(".js-login");
    html_loggedIn = document.querySelector(".js-loggedIn");

    if(sessionStorage.getItem("token")) {
        html_login.innerHTML = "";
        html_loggedIn.innerHTML = "<p>Je bent al aangemeld</p>";
    };

    html_submit.addEventListener("click", function() {
        const username = html_username.value;
        const password = html_password.value;
        
        const body = JSON.stringify({
            username: username,
            password: password
        });

        handleData("http://192.168.0.120:5000/api/v1/aanmelden", showAangemeld, showError, "POST", body);
    });
};
//#endregion

//#region ***  INIT / DOMContentLoaded  ***
//#endregion