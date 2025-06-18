import { getNameAndId } from "../../Data_Base/model.js";
import { getCookie } from "../../library.js";

document.addEventListener("DOMContentLoaded", function() {

    loadCarouselImages();
    eventListenerHandler()

    const uid = getCookie("user");
    getNameAndId(uid);

})

function eventListenerHandler() {

    const back = document.querySelector(".profile_back_arrow");
    console.log("Back button found:", back);
    if (back) {
        back.addEventListener("click", toHomeScreen, false);
    } else {
        alert("Back button not found!");
    }

}

function loadCarouselImages() {

    const url = 'https://www.googleapis.com/books/v1/volumes?q=subject:martial+arts&maxResults=7';

    let images = document.querySelectorAll("img.reads_book");

    loadBookDetails(images, null, null, null, url, images.length, 0);

}

function toHomeScreen() {
    console.log("Button clicked!");
    window.location.href = "../Home/structure.html";
}

function loadBookDetails(img, desc, aut, tit, url, quant, index) {

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {

                for(var i = 0; i < quant; i++, index++) {

                    const book = data.items[index];
                    const id = book.id;
                    const title = book.volumeInfo.title;
                    const thumbnail = book.volumeInfo.imageLinks?.thumbnail;
                    const description = book.volumeInfo.description;
                    const author = book.volumeInfo.authors?.[0];

                    if (thumbnail && img) {
                            
                        img[i].src = thumbnail;
                        img[i].alt = title;
                        img[i].style.setProperty("--id", id)

                    }

                    if (description && desc) { desc[i].innerHTML = description; }

                    if (author && aut) { aut.innerHTML[i] = book.volumeInfo.authors[0]; }

                    if(title && tit) { tit.innerHTML[i] = title } 

                }

            } 
            else { console.log("No books found"); }
        }
    );
}