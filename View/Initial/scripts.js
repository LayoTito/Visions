function togglePopup() {
    const popupLogin = document.getElementById("popup");
    const popupRegister = document.getElementById("popup_register");
    const overlay = document.getElementById("popup_overlay");
    

    popupLogin.style.display = "none";
    popupRegister.style.display = "none";
    overlay.style.display = "none";
}

function togglePopupLogin() {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("popup_overlay");
    

    if (popup.style.display === "none" || popup.style.display === "") {

        popup.style.display = "block";
        overlay.style.display = "block";

    } else {

        popup.style.display = "none";
        overlay.style.display = "none"; 
        
    }
}

function togglePopupRegister() {
    const popup = document.getElementById("popup_register");
    const overlay = document.getElementById("popup_overlay");

    if (popup.style.display === "none" || popup.style.display === "") {

        popup.style.display = "block";
        overlay.style.display = "block";

    } else {

        popup.style.display = "none";
        overlay.style.display = "none"; 
        
    }
}