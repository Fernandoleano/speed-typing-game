const quoteApi = "https://api.quotable.io/random";
const quoteDisplayEl = document.getElementById("quoteDisplay");
const quoteInputEl = document.getElementById("quoteInput");
const timerEl = document.getElementById("Timer");

// User input
quoteInputEl.addEventListener("input", () => {
    const arrayQuote = quoteDisplayEl.querySelectorAll("span");
    const arrayValue = quoteInputEl.value.split("");
    let correct = true;
    arrayQuote.forEach((characterSpan, index) => {
     const character = arrayValue[index];
     if (character == null) {
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
            correct = false;
     }
     else if (character === characterSpan.innerText) {
         characterSpan.classList.add("correct");
         characterSpan.classList.remove("incorrect");
     } else {
            characterSpan.classList.add("incorrect");
            characterSpan.classList.remove("correct");
            correct = false;
     }
    });
    if (correct) getNewQuote();
}); 

// Generationg random quotes
function randomQuote() {
    return fetch(quoteApi)
    .then(response => response.json())
    .then(data => data.content)
}

// rendering new quotes
async function getNewQuote() {
    const quote = await randomQuote();
    quoteDisplayEl.innerHTML = '';
    quote.split("").forEach(character => {
        const characterEl = document.createElement("span");
        characterEl.innerText = character;
        quoteDisplayEl.appendChild(characterEl);
    });
    quoteInputEl.value = null;
    startTimer();
}

// timer for the user
let startTime
function startTimer() {
    timerEl.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        Timer.innerText = getTimerTime();
    }, 1000);
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

getNewQuote();
