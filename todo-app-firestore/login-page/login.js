import { auth, db } from "../config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const form = document.querySelector("#form");
const email = document.querySelector("#email");
const username = document.querySelector("#username");

const password = document.querySelector("#password");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log(user);
      window.location = "../todo-page/index.html";

      try {
        const docRef = await addDoc(collection(db, "users"), {
          username: username.value,
          email: email.value,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    })

    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});
