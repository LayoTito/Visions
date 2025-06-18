document.addEventListener("DOMContentLoaded", function () {

    eventListenerHandler();

})

window.addEventListener('scroll', function() {
    if((this.window.innerHeight + this.window.scrollY) >= this.document.body.offsetHeight) {
        
    }
})

function toHomeScreen() {
    window.location.href = "../Home/structure.html";
}

function searchForBooks() {
    createBookStructure(10);
    
    let containers = document.querySelectorAll("div.results > div.book")
    let images = document.querySelectorAll("div.empty > img");
    let titles = document.querySelectorAll("div.empty > div.content > h1");
    let authors = document.querySelectorAll("div.empty > div.content > h2");
    let descriptions = document.querySelectorAll("div.empty > div.content > p");

    let url = getInputValue();

    loadBookDetails(images, descriptions, authors, titles, url, images.length, 0);

    containers.forEach(el => {
        addClass([el], "click");
        removeClass([el], "empty");
    });
}

function addClass(element, className) { element.forEach(el => el.classList.add(className)); }

function removeClass(element, className) {element.forEach(el => el.classList.remove(className)); }

function createBookStructure(quantity) {
    var book = document.querySelector("div.empty");
    for(var i = 0; i <= quantity; i++) {
        var newBook = book.cloneNode(true);
        
        document.querySelector("div.results").appendChild(newBook);
    }
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

    let booksImage = document.querySelectorAll("div.book > img");

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