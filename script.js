const gameOptions = document.getElementById("gameOptions");
const solitaireButton = document.getElementById("solitaireButton");
const multiplayerButton = document.getElementById("multiplayerButton");
const playButton = document.getElementById("playButton");
const game = document.getElementById("game");

solitaireButton.addEventListener("click", () => {
    multiplayerButton.style.display = "none";
    game.style.display = "block";

    startSolitaireMode();
});

multiplayerButton.addEventListener("click", () => {
    solitaireButton.style.display = "none"; 
    game.style.display = "block"; 

    startMultiplayerMode();
});
playButton.addEventListener("click", () => {
    playButton.style.display = "none"; 
    game.style.display = "block";
}); 

function startSolitaireMode() {
    const { word, hint } = generateWordAndHint();

    const wordDisplay = document.getElementById("wordDisplay");
    const gameResult = document.getElementById("gameResult");

    
    alert(`Indice : ${hint}`);

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
}

function generateWordAndHint() {
    const wordsAndHints = [
        { word: "PENDU", hint: "Un jeu de devinette" },
        { word: "INFORMATIQUE", hint: "Le domaine des ordinateurs" },
    ];

    const randomIndex = Math.floor(Math.random() * wordsAndHints.length);
    return wordsAndHints[randomIndex];
}
function startMultiplayerMode() {
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
                    resetLetters();
                } else if (incorrectAttempts >= maxAttempts) {
                    gameResult.textContent = `Perdu! Le mot était : ${word}`;
                    resetLetters();
                }
            });
        });
    } else if (userInput.length === 0 || userInput.includes(' ') || userInput.indexOf(' ') !== -1) {
        alert('Le mot contient un espace ou est vide !');
    } else {
        alert('Le mot contient des caractères non autorisés.');
    }
}
function resetLetters() {
    const letters = document.querySelectorAll(".letter");

    letters.forEach((letter) => {
        letter.classList.remove("correct");
        letter.classList.remove("incorrect");
    });
}
