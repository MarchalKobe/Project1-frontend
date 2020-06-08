//#region ***  DOM references ***
let html_nickname, html_answer, html_send_button, html_message, html_answer_text;
let messageID, messageInterval;
//#endregion

//#region ***  Callback-Visualisation - show___ ***
const showNickname = function(jsonObject) {
    html_nickname = document.querySelector(".js-nickname");
    html_nickname.innerHTML = `${jsonObject.nickname.Bijnaam}:`;

    listenToSendButton();
}

const showSendMessage = function(jsonObject) {
    html_answer = document.querySelector(".js-answer");

    html_answer.style.display = "inherit";
    messageID = jsonObject.id;
    console.log(messageID);
    
    messageInterval = setInterval(getAnswer, 500);
};

const showSendError = function(jsonObject) {
    console.log(jsonObject);
};

const showAnswer = function(jsonObject) {
    html_answer_text = document.querySelector(".js-answer-text");

    let answer = jsonObject.answer.Antwoord;
    if(answer) {
        console.log(answer);
        clearInterval(messageInterval);
        html_answer_text.innerHTML = answer;
    }
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

const getAnswer = function() {
    const token = sessionStorage.getItem("token");

    if(token) {
        handleData(`http://192.168.0.120:5000/api/v1/message/answer/${messageID}`, showAnswer, null, "GET", null, token);
    };
};
//#endregion

//#region ***  Event Listeners - listenTo___ ***
const listenToSendButton = function() {
    html_answer = document.querySelector(".js-answer");
    html_send_button = document.querySelector(".js-send-button");
    html_message = document.querySelector(".js-message");
    html_answer_text = document.querySelector(".js-answer-text");

    html_answer.style.display = "none";

    html_send_button.addEventListener("click", function() {
        html_answer_text.innerHTML = "Wachten..";

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