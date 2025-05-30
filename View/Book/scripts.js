import { toHomeScreen } from '../../library.js'
import { toSearchScreen } from '../../library.js';
import { loadBookDetails } from '../../library.js';
import { getCookie } from '../../library.js'

document.addEventListener("DOMContentLoaded", function () {
    setPageData();
    eventListenerHandler()
});

function setPageData() {
    let id = getCookie("id");
    const url = `https://www.googleapis.com/books/v1/volumes/${id}`;

    console.log(url);
    
    let image = document.querySelector("img.cover");
    let background = document.querySelector("div.wallpaper > div.blur");
    let tit = document.querySelector("div.book-content > div.text > div.title");
    let aut = document.querySelector("div.book-content > div.text > div.author");
    //let rat = document.querySelector("div.book_raing_container > div.rating_number");
    let desc = document.querySelector("div.description > p.text");

    loadBookDetails(image, desc, aut, tit, 1, 0);

    if(image.src != null) { background.style.backgroundImage = `url('${image.src}')`; }
}

function backScreen() {
    let from = getCookie("from");

    if(from == "home") { toHomeScreen(); }
    else if(from = "search") { toSearchScreen(); }
}

function eventListenerHandler() {
    const back = document.querySelector("button.back-arrow");

    back.addEventListener("click", backScreen, false);
}