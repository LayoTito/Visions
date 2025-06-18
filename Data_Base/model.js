import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import{ doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { increment, collection, query, where, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";


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
  if (userCookie && window.location.pathname.includes("Initial")) {
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
        user = userCredential.user;

        setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: email.split("@")[0],
          id: '@' + email.split("@")[0],
        })
        .then(() => {
          console.log("Usuário salvo com sucesso!");
          setCookie("user", user.uid, 365);
          window.location.href = "../Home/structure.html";
        })
        .catch((error) => {
          alert("Erro ao salvar usuário no Firestore:", error);
        });
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

export function incrementBookViews(bookId) {
  const bookRef = doc(db, "books", bookId);

  setDoc(bookRef, {
    id: bookId,
    views: increment(1)  // cria ou incrementa
  }, { merge: true })
    .then(() => {
      console.log("Visualização incrementada.");
    })
    .catch((error) => {
      console.error("Erro ao incrementar views:", error.message);
    });
}

window.login = login;

export function storeReview() {

  const reviewText = document.querySelector('.resenha > textarea').value;
  const visibility = document.querySelector('.resenha > .bottom > input').value;
  const bookId = getCookie("id");
  const userId = getCookie("user");

  if (!reviewText || !bookId || !userId) {
    alert('Please fill in all fields.');
    return;
  }

  const reviewRef = doc(db, "reviews", generateRandomString(16));

  setDoc(reviewRef, {
    userId: userId,
    bookId: bookId,
    review: reviewText,
    visibility: visibility,
    timestamp: new Date()
  })
  .then(() => {
    console.log("Review stored successfully.");
    document.querySelector('.resenha').style.display = 'none';
  })
  .catch((error) => {
    console.error("Error storing review:", error);
  });

}

function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

export async function getNameAndId(uid) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  const name = document.querySelector(".profile_name");
  const idd = document.querySelector(".profile_id");

  if (userSnap.exists()) {
    const nome = userSnap.data().name;
    const id = userSnap.data().id;

    name.innerHTML = nome;
    idd.innerHTML = id;
    return nome;
  } else {
    console.log("Usuário não encontrado.");
    return null;
  }
}