//#region ***  DOM references ***
let html_links, html_deleteButtons, html_popup, html_popupClose, html_popupTitle, html_popupSubtitle, html_popupUrl, html_popupNo, html_popupYes, html_linkAdd, html_link;
//#endregion

//#region ***  Callback-Visualisation - show___ ***
const showLinks = function(jsonObject) {
    console.log(jsonObject);
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
//#endregion

//#region ***  Callback-No Visualisation - callback___  ***
//#endregion

//#region ***  Data Access - get___ ***
const getLinks = function() {
    const token = sessionStorage.getItem("token");

    if(token) {
        handleData("http://192.168.0.120:5000/api/v1/links", showLinks, null, "GET", null, token);
    };
};
//#endregion

//#region ***  Event Listeners - listenTo___ ***
const listenLinkButtons = function() {
    html_popup = document.querySelector(".js-popup");
    html_popupClose = document.querySelector(".js-popup-close");
    html_popupTitle = document.querySelector(".js-popup-title");
    html_popupSubtitle = document.querySelector(".js-popup-subtitle");
    html_popupUrl = document.querySelector(".js-popup-url");
    html_popupNo = document.querySelector(".js-popup-no");
    html_popupYes = document.querySelector(".js-popup-yes");
    html_link = document.querySelector(".js-link");
    html_linkAdd = document.querySelector(".js-link-add");
    html_deleteButtons = document.querySelectorAll(".js-delete-button");

    html_linkAdd.addEventListener("click", function() {
        html_popup.style.display = "inherit";
        html_popupClose.addEventListener("click", function() {
            html_popup.style.display = "none";
        });

        html_popupNo.addEventListener("click", function() {
            html_popup.style.display = "none";
        });

        html_popupTitle.innerHTML = "Link toevoegen";
        html_popupSubtitle.innerHTML = "Ben je zeker dat je deze link wilt toevoegen?";
        html_popupUrl.innerHTML = `Link: ${html_link.value}`;
    });

    for(const button of html_deleteButtons) {
        button.addEventListener("click", function() {
            html_popup.style.display = "inherit";
            html_popupClose.addEventListener("click", function() {
                html_popup.style.display = "none";
            });

            html_popupNo.addEventListener("click", function() {
                html_popup.style.display = "none";
            });

            html_popupTitle.innerHTML = "Link verwijderen";
            html_popupSubtitle.innerHTML = "Ben je zeker dat je deze link wilt verwijderen?";
            html_popupUrl.innerHTML = `Link: ${this.dataset.url}`;
            html_popupYes.dataset.id = this.dataset.id;
        });
    };


};
//#endregion

//#region ***  INIT / DOMContentLoaded  ***
//#endregion