//#region ***  DOM references ***
let hmtl_info, html_infoButton, html_links, html_deleteButtons, html_popup, html_popupClose, html_popupTitle, html_popupSubtitle, html_popupUrl, html_popupNo, html_popupYesRemove, html_popupYesAdd, html_linkAdd, html_link, html_popupContent, html_popupContentError;
let doOnceAdd = true;
let doOnceRemove = true;
//#endregion

//#region ***  Callback-Visualisation - show___ ***
const showLinks = function(jsonObject) {
    html_links = document.querySelector(".js-links");

    html = ``;

    for(const link of jsonObject.links) {
        html += `
            <span class="c-content__link">
                <button class="o-button-reset c-delete-event js-delete-button" data-url="${link.Link}" data-id="${link.LinkID}">
                    <svg class="c-delete-event__svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
                <p>${link.Link}</p>
            </span>
        `;
    };

    html_links.innerHTML = html;

    listenLinkButtons();
};

const showLinkRemoveMessage = function(jsonObject) {
    html_popupContent = document.querySelector(".js-popup-content");
    html_popupContentError = document.querySelector(".js-popup-content-error");

    html_popupContent.style.display = "none";
    html_popupContentError.style.display = "inherit";
    html_popupContentError.innerHTML = jsonObject.message;

    window.setTimeout(getLinks, 250);
};

const showLinkAddMessage = function(jsonObject) {
    html_popupContent = document.querySelector(".js-popup-content");
    html_popupContentError = document.querySelector(".js-popup-content-error");
    html_link = document.querySelector(".js-link");

    html_popupContent.style.display = "none";
    html_popupContentError.style.display = "inherit";
    html_popupContentError.innerHTML = `<span>Activiteit succesvol toegevoegd aan de kalender</span>`;
    html_link.value = ""

    window.setTimeout(getLinks, 250);
};

const showLinkAddError = function(jsonObject) {
    html_popupContent = document.querySelector(".js-popup-content");
    html_popupContentError = document.querySelector(".js-popup-content-error");

    html_popupContent.style.display = "none";
    html_popupContentError.style.display = "inherit";
    html_popupContentError.innerHTML = `<span class="u-color-error">Link niet toegevoegd, vul de velden juist in.</span>`;
};
//#endregion

//#region ***  Callback-No Visualisation - callback___  ***
//#endregion

//#region ***  Data Access - get___ ***
const getLinks = function() {
    const token = sessionStorage.getItem("token");

    if(token) {
        handleData(`http://${window.location.hostname}:5000/api/v1/links`, showLinks, null, "GET", null, token);
    };
};
//#endregion

//#region ***  Event Listeners - listenTo___ ***
const listenLinkButtons = function() {
    html_info = document.querySelector(".js-info");
    html_infoButton = document.querySelector(".js-info-button");
    html_popupContent = document.querySelector(".js-popup-content");
    html_popupContentError = document.querySelector(".js-popup-content-error");
    html_popup = document.querySelector(".js-popup");
    html_popupClose = document.querySelector(".js-popup-close");
    html_popupTitle = document.querySelector(".js-popup-title");
    html_popupSubtitle = document.querySelector(".js-popup-subtitle");
    html_popupUrl = document.querySelector(".js-popup-url");
    html_popupNo = document.querySelector(".js-popup-no");
    html_popupYesRemove = document.querySelector(".js-popup-yes-remove");
    html_popupYesAdd = document.querySelector(".js-popup-yes-add");
    html_link = document.querySelector(".js-link");
    html_linkAdd = document.querySelector(".js-link-add");
    html_deleteButtons = document.querySelectorAll(".js-delete-button");

    html_infoButton.addEventListener("click", function() {
        html_info.classList.toggle("c-content__info-visable");
    });

    html_linkAdd.addEventListener("click", function() {
        html_popupContentError.style.display = "none";
        html_popupContent.style.display = "inherit";
        html_popup.style.display = "inherit";
        html_popupClose.addEventListener("click", function() {
            html_popup.style.display = "none";
        });

        html_popupNo.addEventListener("click", function() {
            html_popup.style.display = "none";
        });

        html_popupTitle.innerHTML = "Link toevoegen";
        html_popupSubtitle.innerHTML = "Ben je zeker dat je deze link wilt toevoegen? (Kan even duren)";
        html_popupUrl.innerHTML = `Link: ${html_link.value}`;

        html_popupYesRemove.style.display = "none";
        html_popupYesAdd.style.display = "inherit";

        if(doOnceAdd) {
            html_popupYesAdd.addEventListener("click", function() {
                const data = {
                    url: html_link.value
                };
    
                const token = sessionStorage.getItem("token");
    
                if(token) {
                    handleData(`http://${window.location.hostname}:5000/api/v1/links`, showLinkAddMessage, showLinkAddError, "PUT", JSON.stringify(data), token);
                };
            });

            doOnceAdd = false;
        };
    });

    for(const button of html_deleteButtons) {
        button.addEventListener("click", function() {
            html_popupContentError.style.display = "none";
            html_popupContent.style.display = "inherit";
            html_popup.style.display = "inherit";
            html_popupYesRemove.style.display = "inherit";
            html_popupYesAdd.style.display = "none";

            html_popupClose.addEventListener("click", function() {
                html_popup.style.display = "none";
            });

            html_popupNo.addEventListener("click", function() {
                html_popup.style.display = "none";
            });

            html_popupTitle.innerHTML = "Link verwijderen";
            html_popupSubtitle.innerHTML = "Ben je zeker dat je deze link wilt verwijderen?";
            html_popupUrl.innerHTML = `Link: ${this.dataset.url}`;
            html_popupYesRemove.dataset.id = this.dataset.id;

            if(doOnceRemove) {
                html_popupYesRemove.addEventListener("click", function() {
                    const token = sessionStorage.getItem("token");
    
                    if(token) {
                        handleData(`http://${window.location.hostname}:5000/api/v1/links/${this.dataset.id}`, showLinkRemoveMessage, null, "DELETE", null, token);
                    };
                });

                doOnceRemove = false;
            };
        });
    };
};
//#endregion

//#region ***  INIT / DOMContentLoaded  ***
//#endregion