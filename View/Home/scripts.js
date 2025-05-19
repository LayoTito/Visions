document.addEventListener('DOMContentLoaded', 
    function() {

        dailyLoad();
        hotPicksLoads();
        releasesLoads();
        recommendationLoads();

        eventListenerHandler();

    }
);


function dailyLoad() {

    const img = document.getElementById("daily-image");
    const desc = document.getElementById("desc");

    loadBookDetails(img, desc, null, null, "https://www.googleapis.com/books/v1/volumes?q=Harry+Potter&maxResults=1", 0);

 }

function hotPicksLoads() {

    const pick1 = document.getElementById("hot-book1");
    const pick2 = document.getElementById("hot-book2");
    const pick3 = document.getElementById("hot-book3");

    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=3`;

    loadImage(pick1, url, 0);
    loadImage(pick2, url, 1);
    loadImage(pick3, url, 2);

}


function releasesLoads() {

    const release1 = document.getElementById("release-book1");
    const release2 = document.getElementById("release-book2");
    const release3 = document.getElementById("release-book3");
    const release4 = document.getElementById("release-book4");
    const release5 = document.getElementById("release-book5");
    const release6 = document.getElementById("release-book6");

    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&maxResults=6`;

    loadImage(release1, url, 0);
    loadImage(release2, url, 1);
    loadImage(release3, url, 2);
    loadImage(release4, url, 3);
    loadImage(release5, url, 4);
    loadImage(release6, url, 5);

}

function recommendationLoads() {

    const rec1 = document.getElementById("rec-book1");
    const rec2 = document.getElementById("rec-book2");
    const rec3 = document.getElementById("rec-book3");
    
    const desc1 = document.getElementById("rec-desc1");
    const desc2 = document.getElementById("rec-desc2");
    const desc3 = document.getElementById("rec-desc3");
    
    const aut1 = document.getElementById("rec-aut1");
    const aut2 = document.getElementById("rec-aut2");
    const aut3 = document.getElementById("rec-aut3");
    
    const title1 = document.getElementById("rec-title1");
    const title2 = document.getElementById("rec-title2");
    const title3 = document.getElementById("rec-title3");

    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:romance+fantasy&maxResults=3`;

    loadBookDetails(rec1, desc1, aut1, title1, url, 0);
    loadBookDetails(rec2, desc2, aut2, title2, url, 1);
    loadBookDetails(rec3, desc3, aut3, title3, url, 2);

}

function loadImage(element, url, index) {

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const book = data.items[index];
                const title = book.volumeInfo.title;
                const thumbnail = book.volumeInfo.imageLinks?.thumbnail;

                if (thumbnail) {
                    element.src = thumbnail;
                    element.alt = title;
                }

            } else {
                console.log("No books found");
            }
        }
    )

}

function loadBookDetails(img, desc, aut, tit, url, index) {

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const book = data.items[index];
                const title = book.volumeInfo.title;
                const thumbnail = book.volumeInfo.imageLinks?.thumbnail;
                const description = book.volumeInfo.description;
                const author = book.volumeInfo.authors?.[0];

                if (thumbnail) {
                    img.src = thumbnail;
                    img.alt = title;
                }

                if (description) { desc.innerHTML = description; }

                if (author) { aut.innerHTML = book.volumeInfo.authors[0]; }

                if(title) { tit.innerHTML = title }

            } else {
                console.log("No books found");
            }
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

function toBookScreen() {

    window.location.href = "../Book/structure.html";
    
}


document.addEventListener('DOMContentLoaded', function() {
    dailyLoad();
    hotPicksLoads();
    releasesLoads();
    recommendationLoads();
    eventListenerHandler();
});