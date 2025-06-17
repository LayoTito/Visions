import { loadBookDetails } from '../../library.js';
import { toSearchScreen } from '../../library.js';
import { toProfileScreen } from '../../library.js';
import { toBookScreen } from '../../library.js';

document.addEventListener('DOMContentLoaded', 
    async function() {
        await loadsHandler();
        eventListenerHandler();
    }
);

function loadsHandler() {
    dailyLoad();
    releasesLoads();
    popularLoads("https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&maxResults=3");
    recommendationLoads(`https://www.googleapis.com/books/v1/volumes?q=subject:romance&maxResults=3`);
}

function dailyLoad() {
    const img = [document.getElementById("daily-image")];
    const desc = [document.getElementById("desc")];

    loadBookDetails(img, desc, null, null, "https://www.googleapis.com/books/v1/volumes?q=Harry+Potter&maxResults=1", 1, 0);
 }

function popularLoads(url) {
    const popularImages = document.querySelectorAll("div.popular > div.books > img");

    loadBookDetails(popularImages, null, null, null, url, popularImages.length, 0);
}

function releasesLoads() {
    const releaseImages = document.querySelectorAll("div.new-releases > div.books img");

    const url = "https://www.googleapis.com/books/v1/volumes?q=subject:humor";

    loadBookDetails(releaseImages, null, null, null, url, 6, 0);
}

function recommendationLoads(url) {
    const images = document.querySelectorAll("div.recommendations > div.books > img.cover");
    const titles = document.querySelectorAll("div.recommendations > div.books > div.text > h1.title");
    const authors = document.querySelectorAll("div.recommendations > div.books > div.text > h1.author");
    const descriptions = document.querySelectorAll("div.recommendations > div.books > div.text > p.description");

    console.log(images, titles, authors, descriptions);

    loadBookDetails(images, descriptions, authors, titles, url, images.length, 0);
}

function eventListenerHandler() {
    booksImageHandler();
    popularHandler();
    recomendationsHandler();
    lupaHandler();
    profileHandler();
}

function booksImageHandler() {
    let booksImage = document.querySelectorAll("img.click");

    booksImage.forEach(function(element) { 
        element.addEventListener("click", function() { toBookScreen(element); }, false);
    });
}

function popularHandler() {
    let hotPicksPeriod = document.querySelectorAll("div.popular > div.periods > h1");

    hotPicksPeriod.forEach(function(element) {

        element.addEventListener("click", function() {
            
            document.querySelectorAll('div.popular > div.periods > h1')
                .forEach(e => e.classList.remove('active'));
            this.classList.add('active');

            let a = this.style.getPropertyValue("--a");

            if(a == "1") { var url = `https://www.googleapis.com/books/v1/volumes?q=subject:drama&maxResults=3`; }
            else if(a == "2") { var url = `https://www.googleapis.com/books/v1/volumes?q=subject:romance&maxResults=3`; }
            else if(a == "3") { var url = `https://www.googleapis.com/books/v1/volumes?q=subject:adventure&maxResults=3`; }
            else { var url = `https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&maxResults=3`; }

            popularLoads(url)
        });
    });
}

function recomendationsHandler() {
    let recommendations = document.querySelectorAll("div.recommendations > div.genres > h1");

    recommendations.forEach(function(element) {
        element.addEventListener("click", function() {
            
            document.querySelectorAll('div.recommendations > div.genres > h1')
                .forEach(e => e.classList.remove('active'));
            this.classList.add('active');

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


function lupaHandler() {
    let lupa = document.querySelector("div.navigation > button.lupa");

    lupa.addEventListener("click", toSearchScreen);
}

function profileHandler() {
    let profile = document.querySelector("div.navigation > button.logo");

    profile.addEventListener("click", toProfileScreen);
}