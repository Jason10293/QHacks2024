var flashcardsContainer = document.getElementById("flashcards");
var nextButton = document.getElementById("next");
var prevButton = document.getElementById("prev");

fetch("/data")
  .then((response) => response.json())
  .then((data) => {
    var flashcards = [];
    for (let i = 0; i < data.length; i++) {
      flashcards.push({ question: data[i].question, answer: data[i].answer });
    }
    console.log(flashcards);

    flashcards.forEach(function (flashcard, index) {
      var flashcardElement = document.createElement("div");
      flashcardElement.className = "flashcard";
      if (index === 0) {
        flashcardElement.classList.add("active"); // Make the first flashcard active
      }
      flashcardElement.onclick = function () {
        this.classList.toggle("flipped");
      };

      var front = document.createElement("div");
      front.className = "side front";
      console.log(flashcard.question);
      front.textContent = flashcard.question;

      var back = document.createElement("div");
      back.className = "side back";
      back.textContent = flashcard.answer;

      flashcardElement.appendChild(front);
      flashcardElement.appendChild(back);

      flashcardsContainer.appendChild(flashcardElement);
    });
  })
  .catch((error) => console.error("Error:", error));

prevButton.onclick = function () {
  var current = document.querySelector(".flashcard.active");
  if (current.classList.contains("flipped")) {
    current.classList.remove("flipped");
    // Delay the switching of the cards until after the flip back animation has completed
    setTimeout(switchCard, 300); // 600ms is the duration of the flip animation
  } else {
    switchCard();
  }

  function switchCard() {
    var prev =
      current.previousElementSibling || flashcardsContainer.lastElementChild;
    current.classList.remove("active");
    prev.classList.add("active");
  }
};

nextButton.onclick = function () {
  var current = document.querySelector(".flashcard.active");
  if (current.classList.contains("flipped")) {
    current.classList.remove("flipped");
    // Delay the switching of the cards until after the flip back animation has completed
    setTimeout(switchCard, 300); // 600ms is the duration of the flip animation
  } else {
    switchCard();
  }

  function switchCard() {
    var next =
      current.nextElementSibling || flashcardsContainer.firstElementChild;
    current.classList.remove("active");
    next.classList.add("active");
  }
};

function uploadFile() {
  var input = document.getElementById("myFile");
  var file = input.files[0];
  if (file) {
    // Do something with the file here, like upload it to a server
    alert(
      file.type === "image/png" ? "" : "Upload failed. File Type not supported."
    );
  } else {
    alert("No file selected");
  }
}

const body = document.body;

// Update the background gradient based on mouse position
document.addEventListener("mousemove", (e) => {
  const mouseX = e.pageX / window.innerWidth - 0.5;
  const mouseY = e.pageY / window.innerHeight - 0.5;

  // Update the gradient colors based on mouse position
  const color1 = getColor(mouseX, mouseY, 0);
  const color2 = getColor(mouseX, mouseY, 2);

  // Set the gradient background
  body.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
});

// Function to get a color based on mouse position
function getColor(x, y, offset) {
  const r = Math.round(50 * Math.abs(Math.sin(x * 2 * Math.PI + offset)));
  const g = Math.round(15 * Math.abs(Math.sin(y * 2 * Math.PI + offset)));
  const b = Math.round(100 * Math.abs(Math.sin((x + y) * Math.PI + offset)));
  return `rgb(${r},${g},${b})`;
}

 // Check if the browser supports the getUserMedia API
 if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Access the user's camera
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      // Display the camera stream in the video element
      var videoElement = document.getElementById('video');
      videoElement.srcObject = stream;
    })
    .catch(function (error) {
      console.error('Error accessing the camera:', error);
    });
} else {
  console.error('getUserMedia is not supported in this browser');
}