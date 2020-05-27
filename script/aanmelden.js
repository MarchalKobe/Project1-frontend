//#region ***  DOM references ***
let html_username, html_password, html_submit, html_login;
//#endregion

//#region ***  Callback-Visualisation - show___ ***
const showAangemeld = function(jsonObject) {
    html_login = document.querySelector(".js-login");

    html_login.innerHTML = "Aangemeld<br />";
    html_login.innerHTML += jsonObject.access_token;
    sessionStorage.setItem("token", jsonObject.access_token);
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