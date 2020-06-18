//#region ***  DOM references ***
let html_username, html_password, html_submit, html_login, html_loggedIn, html_fault;
//#endregion

//#region ***  Callback-Visualisation - show___ ***
const showAangemeld = function(jsonObject) {
    sessionStorage.setItem("token", jsonObject.access_token);
    document.location.href = "/";
};

const showError = function(jsonObject) {
    html_fault = document.querySelector(".js-login-fault");
    html_username = document.querySelector(".js-username");
    html_password = document.querySelector(".js-password");

    html_fault.innerHTML = "Foutieve gebruiker of wachtwoord";
    html_fault.style.marginTop = "-18px";
    html_username.value = "";
    html_password.value = "";
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
        login();
    });

    html_username.addEventListener("keyup", function(event) {
        if(event.keyCode == 13) {
            login();
        };
    });

    html_password.addEventListener("keyup", function(event) {
        if(event.keyCode == 13) {
            login();
        };
    });
};

const login = function() {
        const username = html_username.value;
        const password = html_password.value;
        
        const body = JSON.stringify({
            username: username,
            password: password
        });

        handleData(`http://${window.location.hostname}:5000/api/v1/aanmelden`, showAangemeld, showError, "POST", body);
};
//#endregion

//#region ***  INIT / DOMContentLoaded  ***
//#endregion