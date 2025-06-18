import { toHomeScreen } from '../../library.js';
import { toSearchScreen } from '../../library.js';
import { loadBookDetails } from '../../library.js';
import { getCookie } from '../../library.js'

document.addEventListener("DOMContentLoaded", function () {
    setPageData();
    eventListenerHandler()
});

async function setPageData() {
    let id = getCookie("id");
    console.log(id);
    const url = `https://www.googleapis.com/books/v1/volumes/${id}`;

    console.log(url);
    
    let image = [document.querySelector("img.cover")];
    let background = [document.querySelector("div.wallpaper > div.blur")];
    let tit = [document.querySelector("div.book-content > div.text > div.title")];
    let aut = [document.querySelector("div.book-content > div.text > div.author")];
    //let rat = document.querySelector("div.book_raing_container > div.rating_number");
    let desc = [document.querySelector("div.description > p.text")];

    await loadBookDetails(image, desc, aut, tit, url, 1, 0);

    if(image[0].src) { background[0].style.backgroundImage = `url('${image[0].src}')`; }
}

function backScreen() {
    let from = getCookie("from");

    if(from == "home") { toHomeScreen(); }
    else if(from = "search") { toSearchScreen(); }
}

function eventListenerHandler() {
    const back = document.querySelector("button.back-arrow");

    back.addEventListener("click", backScreen, false);
     const popup = document.querySelector('.buttons > .libary');
     popup.addEventListener("click", togglePopup, false);

}

document.querySelector('.estantepopup .close').addEventListener('click', function() {
    document.querySelector('.estantepopup').style.display = 'none';
});

function togglePopup() {
    console.log("aqui");
    const popup = document.querySelector('.estantepopup');
    if (popup.style.display === 'block') {
        popup.style.display = 'none';
    } else {
        popup.style.display = 'block';
    }
}

document.querySelectorAll('.estantepopup .estante-list input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            document.querySelectorAll('.estantepopup .estante-list input[type="checkbox"]').forEach(cb => {
                if (cb !== this) cb.checked = false;
            });
        }
    });
});

document.querySelectorAll('.rating-stars .star').forEach(star => {
    star.addEventListener('click', function() {
        const value = parseInt(this.getAttribute('data-value'));
        document.querySelectorAll('.rating-stars .star').forEach(s => {
            if (parseInt(s.getAttribute('data-value')) <= value) {
                s.classList.add('selected');
            } else {
                s.classList.remove('selected');
            }
        });
        window.selectedRating = value;
    });
});

document.querySelectorAll('.heart').forEach(heart => {
    heart.addEventListener('click', function() {
        this.classList.toggle('favorited');
        window.isFavorited = this.classList.contains('favorited');
    });
});

document.querySelector('.resenhapopup .close').addEventListener('click', function() {
    document.querySelector('.resenhapopup').style.display = 'none';
});

document.querySelectorAll('.open-review').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelector('.resenhapopup').style.display = 'flex';
    });
});