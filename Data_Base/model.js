// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC01VkLKSnZa0HPexEuMSMmMROgkHrQ9Uw",
  authDomain: "visions-6dcc5.firebaseapp.com",
  projectId: "visions-6dcc5",
  storageBucket: "visions-6dcc5.firebasestorage.app",
  messagingSenderId: "110238262622",
  appId: "1:110238262622:web:3c7ffc0922e032b1485bcf",
  measurementId: "G-7DXHMFXZXE",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const user = null;

function getUserCredentials() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      window.location.href = "../Home/structure.html";
      user = userCredential.user;
      // ...
    })
    .catch((error) => {

      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

}

window.getUserCredentials = getUserCredentials;

function login() {
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      window.location.href = "../Home/structure.html";
      user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

window.login = login;