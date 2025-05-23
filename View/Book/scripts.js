document.addEventListener("DOMContentLoaded", function () {
    console.log(document.cookie);
    setPageData();

    eventListenerHandler()

});

function toHomeScreen() { window.location.href = "../Home/structure.html"; }

function getCookie(name) {

    let cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }

    console.log(cookieArr);

}

function setPageData() {

    let id = getCookie("id");
    const url = `https://www.googleapis.com/books/v1/volumes/${id}`;

    console.log(url);
    
    let image = document.querySelector("img.book_image");
    let background = document.querySelector("div.book-background-blur");
    let tit = document.querySelector("div.book_general_info_container > div.title");
    let aut = document.querySelector("div.book_general_info_container > div.author");
    let rat = document.querySelector("div.book_raing_container > div.rating_number");
    let desc = document.querySelector("div.description_container > p.description_text");

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data) {

                const book = data;
                const id = book.id;
                const title = book.volumeInfo.title;
                const thumbnail = book.volumeInfo.imageLinks?.thumbnail;
                const description = book.volumeInfo.description;
                const author = book.volumeInfo.authors?.[0];
                console.log(author)
                //const rating = book.volumeInfo.averageRating;

                if (thumbnail) {
                    image.src = thumbnail;
                    image.alt = title;
                    image.style.setProperty("--id", id)
                    background.style.backgroundImage = `url('${image.src}')`;

                    //colorjs.average(image.src, { amount: 1 }).then(color => {
                        //console.log(color) // [241, 221, 63]
                       // rat.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                    //})
                }

                if (description) { desc.innerHTML = description; }

                if (author) { aut.innerHTML = "por " + author }

                if (title) { tit.innerHTML = title; }
                
                //if(rating) { rat.innerHTML = rating }

            }
            else { console.log("No books found"); }
        }
    );

}

function backScreen() {
    let from = getCookie("from");

    if(from == "home") { toHomeScreen(); }
    else if(from = "search") { toSearchScreen(); }
}

function toSearchScreen() { window.location.href = "../Search/structure.html";}

function eventListenerHandler() {

    const back = document.querySelector("buttom.book_back_arrow");

    back.addEventListener("click", backScreen, false);

}