document.addEventListener('DOMContentLoaded', 
    async function() {

        await dailyLoad();
        await releasesLoads();
        await hotPicksLoads("https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&maxResults=3");
        await recommendationLoads(`https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&maxResults=3`);

        eventListenerHandler();

    }
);


function dailyLoad() {

    const img = [document.getElementById("daily-image")];
    const desc = [document.getElementById("desc")];

    loadBookDetails(img, desc, null, null, "https://www.googleapis.com/books/v1/volumes?q=Harry+Potter&maxResults=1", 1, 0);

 }

function hotPicksLoads(url) {

    const hotPicksImages = document.querySelectorAll("img.popular_books_image");

    loadBookDetails(hotPicksImages, null, null, null, url, hotPicksImages.length, 0);

}


function releasesLoads() {

    const releaseImages = document.querySelectorAll("img.new_releases_image");

    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&maxResults=6`;

    loadBookDetails(releaseImages, null, null, null, url, releaseImages.length, 0);

}

function recommendationLoads(url) {

    const images = document.querySelectorAll("img.recommendations_book_image");
    const descriptions = document.querySelectorAll("p.recommendations_book_description");
    const authors = document.querySelectorAll("h1.recommendations_book_author");
    const titles = document.querySelectorAll("h1.recommendations_book_title");

    loadBookDetails(images, descriptions, authors, titles, url, images.length, 0);

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

function eventListenerHandler() {

    let booksImage = document.querySelectorAll("img.click");

    booksImage.forEach(function(element) { 
        element.addEventListener("click", function() { toBookScreen(element); }, false);
    });

    let hotPicksPeriod = document.querySelectorAll("h1.popular_books_period");

    hotPicksPeriod.forEach(function(element) {

        element.addEventListener("click", function() {
            
            document.querySelectorAll('.popular_books_period')
                .forEach(e => e.classList.remove('popular_books_period_active'));
            this.classList.add('popular_books_period_active');

            let a = this.style.getPropertyValue("--a");

            if(a == "1") { var url = `https://www.googleapis.com/books/v1/volumes?q=subject:drama&maxResults=3`; }
            else if(a == "2") { var url = `https://www.googleapis.com/books/v1/volumes?q=subject:romance&maxResults=3`; }
            else if(a == "3") { var url = `https://www.googleapis.com/books/v1/volumes?q=subject:adventure&maxResults=3`; }
            else { var url = `https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&maxResults=3`; }

            hotPicksLoads(url);

        });
    });

    let recommendations = document.querySelectorAll("h1.recommendations_genre");

    recommendations.forEach(function(element) {
        element.addEventListener("click", function() {
            
            document.querySelectorAll('.recommendations_genre')
                .forEach(e => e.classList.remove('genre-active'));
            this.classList.add('genre-active');

            let a = this.style.getPropertyValue("--a");

            if(a == "1") { var url = `https://www.googleapis.com/books/v1/volumes?q=subject:drama&maxResults=3`; }
            else if(a == "2") { var url = `https://www.googleapis.com/books/v1/volumes?q=subject:romance&maxResults=3`; }
            else if(a == "3") { var url = `https://www.googleapis.com/books/v1/volumes?q=subject:adventure&maxResults=3`; }
            else if(a == "4") { var url = `https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&maxResults=3`; }
            else { var url = `https://www.googleapis.com/books/v1/volumes?q=subject:thriller&maxResults=3`; }

            recommendationLoads(url);

        });
    });

}


function toProfileScreen() { window.location.href = "../Profile/structure.html"; }

function toSearchScreen() { window.location.href = "../Search/structure.html"; }

async function toBookScreen(element) {
    let id = element.style.getPropertyValue("--id");
    
    setCookie("id", id, 1);
    setCookie("from", "home", 1);

    window.location.href = "../Book/structure.html";
}

function setCookie(c_name, value, exdays) {

    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);

    var c_value = encodeURIComponent(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    
    document.cookie = c_name + "=" + c_value + "; path=/";

}
