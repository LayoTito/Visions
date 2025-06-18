import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import{ doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

import { setCookie, getCookie } from "../../library.js";

const firebaseConfig = {
  apiKey: "AIzaSyC01VkLKSnZa0HPexEuMSMmMROgkHrQ9Uw",
  authDomain: "visions-6dcc5.firebaseapp.com",
  projectId: "visions-6dcc5",
  storageBucket: "visions-6dcc5.firebasestorage.app",
  messagingSenderId: "110238262622",
  appId: "1:110238262622:web:3c7ffc0922e032b1485bcf",
  measurementId: "G-7DXHMFXZXE",
};

document.addEventListener("DOMContentLoaded", function () {
  const userCookie = getCookie("user");
  if (userCookie) {
    window.location.href = "../Home/structure.html";
  }
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
let user;

function getUserCredentials() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("passwordConfirm").value;

  if (isSignUpValid(email, password, passwordConfirm)) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        window.location.href = "../Home/structure.html";
        user = userCredential.user;

      startDatabase(user.uid, email, password) {
        setDoc(doc(db, "users", uid)), {
          uid: uid,
          name: email.split("@")[0],
        }

        setCookie("user", user.uid, 365);
      }

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  else {
    alert("Invalid credentials. Please try again.");
  }
}
window.getUserCredentials = getUserCredentials;

function isSignUpValid(email, password, passwordConfirm) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (email === "" || password === "" || passwordConfirm === "") {
        alert("Please fill in all fields.");
        return false;
    }
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    if (password !== passwordConfirm) {
        alert("Passwords do not match.");
        return false;
    }
    if (!passwordPattern.test(password)) {
        alert("Password must be at least 6 characters, include an uppercase letter, a lowercase letter, and a number.");
        return false;
    }
    return true;
}

function login() {
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    
      window.location.href = "../Home/structure.html";
      user = userCredential.user;
      
      setCookie("user", user.uid, 365);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

window.login = login;