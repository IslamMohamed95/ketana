// const formPinInput = document.querySelector(".form-pin-input"),
//   pinInputs = document.querySelectorAll(".pin-input"),
//   separator = document.querySelector(".separator"),
//   pinError = document.getElementById("pin-error"),
//   resendTimer = document.getElementById("resend-timer"),
//   timerNumber = resendTimer?.querySelector(".timer-number"),
//   send_btn = document.getElementById("send-btn"),
//   edit_num = document.getElementById("link-action-effect");

// let timerInterval;

// /* ✅ Start countdown */
// function startTimer(duration) {
//   if (!timerNumber) return;

//   let remaining = duration;
//   timerNumber.innerText = remaining;

//   timerInterval = setInterval(() => {
//     remaining--;
//     if (remaining > 0) {
//       timerNumber.innerText = remaining;
//     } else {
//       clearInterval(timerInterval);
//       resendTimer.innerHTML = "لم يصلك الكود بعد ؟";
//     }
//   }, 1000);
// }

// /* ✅ Run animation on page load if coming from login */
// document.addEventListener("DOMContentLoaded", () => {
//   if (sessionStorage.getItem("animatePin") === "true") {
//     setTimeout(() => {
//       formPinInput.style.display = "flex"; // show PIN form
//       separator.classList.add("show");

//       pinInputs.forEach((input, index) => {
//         setTimeout(() => input.classList.add("show"), (index + 1) * 200);
//       });

//       startTimer(60);
//     }, 0);

//     if (window.location.pathname.endsWith("verfication.html")) {
//       sessionStorage.removeItem("animatePin");
//     }
//   }
// });

// /* ✅ Handle page restore from cache */
// window.addEventListener("pageshow", (event) => {
//   if (event.persisted) {
//     sessionStorage.removeItem("animatePin");
//   }
// });

// /* ✅ Edit number link */
// edit_num?.addEventListener("click", (e) => {
//   e.preventDefault();
//   const loc = sessionStorage.getItem("loc");
//   if (loc) {
//     window.location.href = `/${loc}.html`;
//     sessionStorage.removeItem("loc");
//   }
// });

// /* ✅ Validate PIN on send */
// send_btn?.addEventListener("click", (e) => {
//   e.preventDefault();

//   const loader = document.getElementById("loader");
//   const btnText = send_btn.querySelector("div:first-child");

//   const enteredPin = Array.from(pinInputs)
//     .map((i) => i.value)
//     .join("");
//   let hasEmpty = false;

//   // Check for empty fields
//   pinInputs.forEach((el) => {
//     if (el.value.trim() === "") {
//       el.style.borderColor = "red";
//       el.style.backgroundColor = "rgba(255,0,0,0.1)";
//       hasEmpty = true;
//     }
//   });

//   if (hasEmpty) {
//     pinError.textContent = "يرجى ملء جميع الخانات";
//     pinError.classList.add("show");
//     return;
//   }

//   // Play loader
//   btnText.style.display = "none";
//   loader.style.display = "flex";
//   send_btn.disabled = true;
//   send_btn.classList.add("loading");

//   setTimeout(() => {
//     const locPage = sessionStorage.getItem("loc");

//     if (enteredPin !== "123456") {
//       // Wrong PIN
//       pinError.textContent = "الرمز غير صحيح أو منتهي الصلاحية";
//       pinError.classList.add("show");
//       pinInputs.forEach((el) => {
//         el.style.borderColor = "red";
//         el.style.backgroundColor = "rgba(255,0,0,0.1)";
//       });
//     } else {
//       // Correct PIN
//       pinError.classList.remove("show");
//       pinInputs.forEach((el) => {
//         el.style.borderColor = "rgba(48,109,254,1)";
//         el.style.backgroundColor = "rgba(48,109,254,0.1)";
//       });

//       localStorage.setItem("isLoggedIn", "true");
//       sessionStorage.setItem("PIN_status", "true");

//       if (locPage === "login") {
//         window.location.href = "index.html";
//       } else if (locPage === "register") {
//         window.location.href = "register.html";
//       }
//       return;
//     }

//     // Restore button state
//     loader.style.display = "none";
//     btnText.style.display = "flex";
//     send_btn.disabled = false;
//     send_btn.classList.remove("loading");
//   }, 2500);
// });

// /* ✅ Handle PIN input behavior */
// pinInputs.forEach((input, index) => {
//   // Force single digit
//   input.addEventListener("input", () => {
//     input.value = input.value.replace(/\D/g, ""); // only numbers
//     if (input.value.length > 1) {
//       input.value = input.value.charAt(0);
//     }

//     if (input.value) {
//       input.style.borderColor = "rgba(48,109,254,1)";
//       input.style.backgroundColor = "rgba(48,109,254,0.1)";
//     } else {
//       input.style.borderColor = "#ccc";
//       input.style.backgroundColor = "var(--form-inp-color)";
//     }

//     // Auto focus next
//     if (input.value && index < pinInputs.length - 1) {
//       pinInputs[index + 1].focus();
//     }
//   });

//   // Backspace navigation
//   input.addEventListener("keydown", (e) => {
//     if (e.key === "Backspace" && !input.value && index > 0) {
//       pinInputs[index - 1].focus();
//     }
//   });
// });
