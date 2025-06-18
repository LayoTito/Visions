export function toProfileScreen() { window.location.href = "../Profile/structure.html"; }

export function toSearchScreen() { window.location.href = "../Search/structure.html"; }

export function toBookScreen(element) {
    let id = element.style.getPropertyValue("--id");
    
    setCookie("id", id, 1);
    setCookie("from", "home", 1);

    window.location.href = "../Book/structure.html";
}

export function toHomeScreen() { window.location.href = "../Home/structure.html"; }

export function loadBookDetails(img, desc, aut, tit, url, quant, index) {

    return fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.items && data.items.length > 0) {
            for(var i = 0; i < Math.min(quant, data.items.length - index); i++) {
                const book = data.items[i];
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
        else if(data) {
            const book = data;
            const id = book.id;
            const title = book.volumeInfo.title;
            const thumbnail = book.volumeInfo.imageLinks?.thumbnail;
            const description = book.volumeInfo.description;
            const author = book.volumeInfo.authors?.[0];

            if (thumbnail && img) {
                    
                img[0].src = thumbnail;
                img[0].alt = title;
                img[0].style.setProperty("--id", id)

            }

            if (description && desc) { desc[0].innerHTML = description; }

            if (author && aut) { aut[0].innerHTML = author; }

            if(title && tit) { tit[0].innerHTML = title; } 
        }         
        else { console.log("No books found"); }
    }
);}

function setCookie(name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);

    var value = encodeURIComponent(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    
    document.cookie = name + "=" + value + "; path=/";
}

export function getCookie(name) {
    let cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
}