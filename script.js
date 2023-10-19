const gameOptions = document.getElementById("gameOptions");
const solitaireButton = document.getElementById("solitaireButton");
const multiplayerButton = document.getElementById("multiplayerButton");
const playButton = document.getElementById("playButton");
const playAgain = document.getElementById("playAgain");
const game = document.getElementById("game");
let errorCount = 0;

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
                errorCount++;
            }

            const wordArray = wordDisplay.textContent.split(" ");
            word.split("").forEach((char, index) => {
                if (char === guessedLetter) {
                    wordArray[index] = char;
                }
            });
            wordDisplay.textContent = wordArray.join(" ");

            if (wordDisplay.textContent.indexOf("_") === -1) {
                gameResult.textContent = `Gagné, avec ${errorCount} erreur(s)!`;
                gameOptions.style.display = "none";
                playAgain.style.display = "block";
                
                resetLetters();
            } else if (incorrectAttempts >= maxAttempts) {
                gameResult.textContent = `Perdu! Le mot était : ${word}`;
                playAgain.style.display = "block";
                gameOptions.style.display = "none";
                
                resetLetters();
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
                    errorCount++;
                }

                const wordArray = wordDisplay.textContent.split(" ");
                word.split("").forEach((char, index) => {
                    if (char === guessedLetter) {
                        wordArray[index] = char;
                    }
                });
                wordDisplay.textContent = wordArray.join(" ");

                if (wordDisplay.textContent.indexOf("_") === -1) {
                    gameResult.textContent = `Gagné, avec ${errorCount} erreur(s)!`;
                    gameOptions.style.display = "none";
                    playAgain.style.display = "block";
                    
                    resetLetters();
                } else if (incorrectAttempts >= maxAttempts) {
                    gameResult.textContent = `Perdu! Le mot était : ${word}`;
                    gameOptions.style.display = "none";
                    playAgain.style.display = "block";
                    
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
    const alphabet = document.getElementById("alphabet")
    letters.forEach((letter) => {
        letter.classList.remove("correct");
        letter.classList.remove("incorrect");
        alphabet.style.display = "none";
    });
}

playAgain.addEventListener("click", () => {
    
}); 
