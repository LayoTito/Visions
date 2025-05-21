document.addEventListener("DOMContentLoaded", function () {

    eventListenerHandler();

})

function toHomeScreen() {
    window.location.href = "../Home/structure.html";
}

function searchForBooks() {
    let images = document.querySelectorAll("div.book-row > img");

    let url = getInputValue();

    loadBookDetails(images, null, null, null, url, images.length, 0);
}

function getInputValue() {
    const element = document.querySelector("input.nav_search_bar")
    const value = element.value;
    if (value == "") return "";
    const url = `https://www.googleapis.com/books/v1/volumes?q=${value}&maxResults=12`;

    return url;
}

function toggleVisibility() {

    let results = document.querySelector("div.results");
    let logo = document.querySelector("div.background_container");

    logo.style.display = "none";
    results.style.display = "flex";

}

function toggleAlert() {
    const alert = document.querySelector("div.alert");

    let id = null;
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 4);

    function frame() {
        alert.style.display = "flex";

        if(pos == 900) { 
            clearInterval(id);
            alert.style.display = "none";
        }
        else {
            alert.style.opacity = 1 - ((pos - 700) / 200);
            pos++;
        }
    }
    

}

function resetVisibility() {
    let results = document.querySelector("div.results");
    let logo = document.querySelector("div.background_container");

    if (logo) logo.style.display = "flex";
    if (results) results.style.display = "none";
}

function eventListenerHandler() {
    const search = document.querySelector(".send");

    search.addEventListener("click",    function() {
        var url = getInputValue();
        
        if(url != "") {
            searchForBooks();
            toggleVisibility();
        }
        else { 
            toggleAlert();
            resetVisibility(); 
        }
    });

    let booksImage = document.querySelectorAll("div.book-row > img");

    booksImage.forEach(function(element) { 
        element.addEventListener("click", function() { toBookScreen(element); }, false);
    });
}

async function toBookScreen(element) {
    let id = element.style.getPropertyValue("--id");
    
    setCookie("id", id, 1);
    setCookie("from", "search", 1);

    window.location.href = "../Book/structure.html";
}

function setCookie(c_name, value, exdays) {

    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);

    var c_value = encodeURIComponent(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    
    document.cookie = c_name + "=" + c_value + "; path=/";

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

                    if (author && aut) { aut[i].innerHTML = author; }

                    if(title && tit) { tit[i].innerHTML = title; } 

                }

            } 
            else { console.log("No books found"); }
        }
    );
}