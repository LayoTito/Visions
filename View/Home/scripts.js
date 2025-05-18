var countImages = 0;

window.onload = function() {
    const searchQuery = "harry potter";
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const book = data.items[countImages];
                const title = book.volumeInfo.title;
                const thumbnail = book.volumeInfo.imageLinks?.thumbnail;
                const description = book.volumeInfo.description;

                countImages++;

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
        })

}

function loadImage(url) {


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