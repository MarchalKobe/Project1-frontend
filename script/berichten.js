//#region ***  DOM references ***
let html_nickname, html_answer, html_send_button, html_message;
//#endregion

//#region ***  Callback-Visualisation - show___ ***
const showNickname = function(jsonObject) {
    html_nickname = document.querySelector(".js-nickname");
    html_nickname.innerHTML = `${jsonObject.nickname.Bijnaam}:`;

    listenToSendButton();
}

const showSendMessage = function(jsonObject) {
    console.log(jsonObject);
};

const showSendError = function(jsonObject) {
    console.log(jsonObject);
};
//#endregion

//#region ***  Callback-No Visualisation - callback___  ***
//#endregion

//#region ***  Data Access - get___ ***
const getNickname = function() {
    const token = sessionStorage.getItem("token");

    if(token) {
        handleData("http://192.168.0.120:5000/api/v1/nickname", showNickname, null, "GET", null, token);
    };
};
//#endregion

//#region ***  Event Listeners - listenTo___ ***
const listenToSendButton = function() {
    html_answer = document.querySelector(".js-answer");
    html_send_button = document.querySelector(".js-send-button");
    html_message = document.querySelector(".js-message");

    html_answer.innerHTML = "";

    html_send_button.addEventListener("click", function() {
        const message = html_message.value;
        const data = {
            message: message
        };

        const token = sessionStorage.getItem("token");

        if(token) {
            handleData("http://192.168.0.120:5000/api/v1/sendmessage", showSendMessage, showSendError, "POST", JSON.stringify(data), token);
        };
    });
};
//#endregion

//#region ***  INIT / DOMContentLoaded  ***
//#endregion