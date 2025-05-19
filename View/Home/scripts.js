window.onload = function() {
    const searchQuery = "harry potter";
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const book = data.items[0];
                const title = book.volumeInfo.title;
                const thumbnail = book.volumeInfo.imageLinks?.thumbnail;
                const description = book.volumeInfo.description;

                if (thumbnail) {
                    const img = document.getElementById("daily-image");
                    img.src = thumbnail;
                    img.alt = title;
                }

                if (description) {
                    const desc = document.getElementById("desc");
                    desc.innerHTML = description;
                }

            } else {
                console.log("No books found");
            }
        }
    )

    hotPicksLoads();
    releasesLoads();

}

function hotPicksLoads() {

    const pick1 = document.getElementById("hot-book1");
    const pick2 = document.getElementById("hot-book2");
    const pick3 = document.getElementById("hot-book3");

    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=3`;

    loadImage(pick1, url, 0);
    loadImage(pick2,  url, 1);
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

function toProfileScreen() {
    window.location.href = "../Profile/structure.html";
}

function toSearchScreen() {
    window.location.href = "../Search/structure.html";
}

function toBookScreen() {
    window.location.href = "../Book/structure.html";
}