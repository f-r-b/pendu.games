const playButton = document.getElementById("playButton");
const game = document.getElementById("game");

playButton.addEventListener("click", () => {
    playButton.style.display = "none"; 
    game.style.display = "block";
function playGame() {
    const userInput = prompt("Entrez le mot à deviner:");

    if (/^[a-zA-Z\s]*$/.test(userInput)) {
       const wordDisplay = document.getElementById("wordDisplay");
       const gameResult = document.getElementById("gameResult");
       const word = userInput ? userInput.toUpperCase() : "";
       wordDisplay.textContent = "_ ".repeat(word.length);

       const letters = document.querySelectorAll(".letter");
       let incorrectAttempts = 0;
       const maxAttempts = word.length * 2;

        letters.forEach((letter) => {
           letter.addEventListener("click", () => {
              if (incorrectAttempts >= maxAttempts) {
                return;
            }
              const guessedLetter = letter.textContent;
              if (word.includes(guessedLetter)) {
                letter.classList.add("correct");
            } else {
                letter.classList.add("incorrect");
                incorrectAttempts++;
            }

            const wordArray = wordDisplay.textContent.split(" ");
            word.split("").forEach((char, index) => {
                if (char === guessedLetter) {
                    wordArray[index] = char;
                }
            });
            wordDisplay.textContent = wordArray.join(" ");

            if (wordDisplay.textContent.indexOf("_") === -1) {
                gameResult.textContent = "Gagné!";
            } else if (incorrectAttempts >= maxAttempts) {
                gameResult.textContent = `Perdu! Le mot était : ${word}`;
            }
        });
    });
} else if (userInput.trim() === "") {
    alert('Le mot contient un espace ou est vide !');
} else {
    alert('Le mot contient des caractères non autorisés.');
    playGame()
} 
}
}); 
