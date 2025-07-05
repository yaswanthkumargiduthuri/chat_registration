const chatContainer = document.getElementById("chat-container");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

const fields = ["first name", "last name", "email", "password", "confirm password"];
const userData = {};
let step = 0;

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.innerText = text;
  chatContainer.appendChild(message);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function nextPrompt() {
  if (step < fields.length) {
    appendMessage("bot", `Please enter your ${fields[step]}:`);
  } else {
    if (userData.password !== userData["confirm password"]) {
      appendMessage("bot", "❗ Passwords do not match. Please re-enter password:");
      step = 3; // Go back to password step
    } else {
      appendMessage("bot", `✅ Welcome, ${userData["first name"]}! Redirecting to your portfolio...`);
      // Redirect after 3 seconds
      setTimeout(() => {
        window.location.href = "https://comfy-panda-e698d4.netlify.app";
      }, 3000);
    }
  }
}

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = userInput.value.trim();
  if (!input) return;

  appendMessage("user", input);

  // Special validation for email
  if (step === 2) {
    if (!input.endsWith("@gmail.com")) {
      appendMessage("bot", "❗ Please enter a valid Gmail address (e.g., yourname@gmail.com)");
      userInput.value = "";
      return;
    }
  }

  userData[fields[step]] = input;

  userInput.value = "";

  step++;

  // Set input type for password fields
  if (step === 3 || step === 4) {
    userInput.type = "password";
  } else {
    userInput.type = "text";
  }

  setTimeout(() => nextPrompt(), 500);
});

// Start chat
window.onload = () => {
  appendMessage("bot", "👋 Hello! Let's get you registered.");
  setTimeout(() => nextPrompt(), 1000);
};
