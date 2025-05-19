document.addEventListener('DOMContentLoaded', 
    async function() {

        await dailyLoad();
        await hotPicksLoads();
        await releasesLoads();
        await recommendationLoads();

        eventListenerHandler();

    }
);


function dailyLoad() {

    const img = [document.getElementById("daily-image")];
    const desc = [document.getElementById("desc")];

    loadBookDetails(img, desc, null, null, "https://www.googleapis.com/books/v1/volumes?q=Harry+Potter&maxResults=1", 1, 0);

 }

function hotPicksLoads() {

    const hotPicksImages = document.querySelectorAll("img.popular_books_image");

    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=3`;

    loadBookDetails(hotPicksImages, null, null, null, url, hotPicksImages.length, 0);

}


function releasesLoads() {

    const releaseImages = document.querySelectorAll("img.new_releases_image");

    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&maxResults=6`;

    loadBookDetails(releaseImages, null, null, null, url, releaseImages.length, 0);

}

function recommendationLoads() {

    const images = document.querySelectorAll("img.recommendations_book_image");
    const descriptions = document.querySelectorAll("p.recommendations_book_description");
    const authors = document.querySelectorAll("h1.recommendations_book_author");
    const titles = document.querySelectorAll("h1.recommendations_book_title");

    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&maxResults=3`;

    loadBookDetails(images, descriptions, authors, titles, url, 3, 0);

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

function eventListenerHandler() {

    let booksImage = document.querySelectorAll("img.click");

    booksImage.forEach(function(element) { 
        element.addEventListener("click", toBookScreen, false);
    });

    let hotPicksPeriod = document.querySelectorAll("h1.popular_books_period");
    hotPicksPeriod.forEach(function(element) {
        element.addEventListener("click", function() {
            document.querySelectorAll('.popular_books_period')
                .forEach(e => e.classList.remove('popular_books_period_active'));
            this.classList.add('popular_books_period_active');
        });
    });
}

function toUppercase(element) {

    document.querySelectorAll("h1.popular_books_period")
        .forEach(el => el.classList.remove("popular_books_period_active"));
    element.classList.add("popular_books_period_active");

   
}
function toProfileScreen() { window.location.href = "../Profile/structure.html"; }

function toSearchScreen() { window.location.href = "../Search/structure.html"; }

async function toBookScreen(element) {

    let id = element.style.getPropertyValue("--id");
    
    await setCookie("id", id, 1);

    window.location.href = "../Book/structure.html";


}

function setCookie(c_name, value, exdays) {

    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);

    var c_value = encodeURIComponent(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    
    document.cookie = c_name + "=" + c_value + "; path=/";

}
