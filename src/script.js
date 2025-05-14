const { ipcRenderer } = require("electron");

document.getElementById("minimize").addEventListener("click", () => {
  ipcRenderer.send("minimize-window");
});

document.getElementById("close").addEventListener("click", () => {
  ipcRenderer.send("close-window");
});

let timerInterval; // Variable to store the interval ID
let timeLeft = 25 * 60; // Initial time in seconds (25 minutes 25*60)

// Add audio element for cheering sound
const cheeringAudio = new Audio('../src/assets/audio/cheering.mp3');

// Function to format time as MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Function to update the timer display
function updateTimerDisplay() {
  const timeElement = document.getElementById("time");
  timeElement.textContent = formatTime(timeLeft);
}

// Function to reset button styles
function resetButtonStyles() {
  document.getElementById("start").classList.remove("active");
  document.getElementById("stop").classList.remove("active");
  document.getElementById("reset").classList.remove("active");
}

// Function to show the custom alert box
function showCustomAlert() {
  const alertBox = document.getElementById("custom-alert");
  alertBox.classList.remove("hidden"); // Show alertbox
  cheeringAudio.play(); // Play cheering
}

// Function to hide the custom alert box
function hideCustomAlert() {
  const alertBox = document.getElementById("custom-alert");
  alertBox.classList.add("hidden"); // Hide alertbox
}

// Add event listener to OK button in alertbox
document.getElementById("alert-ok").addEventListener("click", hideCustomAlert);

// Start button functionality
document.getElementById("start").addEventListener("click", () => {
  if (!timerInterval) {
    resetButtonStyles();
    document.getElementById("start").classList.add("active"); // Highlight Start button
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
        showCustomAlert(); // Show the custom alert when time is up
      }
    }, 1000);
  }
});

// Stop button functionality
document.getElementById("stop").addEventListener("click", () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    resetButtonStyles();
    document.getElementById("stop").classList.add("active"); // Highlight Stop button
  }
});

// Reset button functionality
document.getElementById("reset").addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = 25 * 60; // Reset to 25 minutes
  updateTimerDisplay();
  resetButtonStyles();

  const resetButton = document.getElementById("reset");
  resetButton.classList.add("active"); // Add active class

  // Remove the active class after 1 second
  setTimeout(() => {
    resetButton.classList.remove("active");
  }, 1000);
});

// Initialize the timer display
updateTimerDisplay();