const forgotBtn = document.querySelector("#forgot");
const email = document.querySelector("#email");

import {
  getAuth,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const auth = getAuth();
forgotBtn.addEventListener("click", () => {
  sendPasswordResetEmail(auth, email.value)
    .then(() => {
      email = "";
      console.log(
        "Congratulation!",
        "Your Password has been reset!",
        "Please check your email"
      );
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});
