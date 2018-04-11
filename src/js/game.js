(function () {

    let number;
    let moves;
    let win;

    let userInput;
    let addNumberButton;
    let helpImage;
    let gameList;
    let statusContent;
    let timeContent;
    let newGameButton;

    let timer;

    function init() {
        userInput = document.querySelector('#userInput');
        addNumberButton = document.querySelector('#addNumberButton');
        helpImage = document.querySelector('#helpImage');
        gameList = document.querySelector('#gameList');
        statusContent = document.querySelector('#statusContent');
        timeContent = document.querySelector('#timeContent');
        newGameButton = document.querySelector('#newGameButton');

        addNumberButton.addEventListener('click', play, false);
        newGameButton.addEventListener('click', startGame, false);

        startGame();
    }

    function startGame() {
        clearInterval(timer);

        number = parseInt(Math.random() * 100);
        moves = [];
        win = false;

        helpImage.setAttribute('src', 'assets/question.png');
        statusContent.innerHTML = '';
        gameList.innerHTML = '';
        timeContent.textContent = '60';

        let time = 60;
        timer = setInterval(() => {
            time--;

            timeContent.textContent = '' + time;

            if (time <= 0) {
                endGame();
            }
        }, 1000);
    }

    function play() {
        helpImage.setAttribute('src', '');
        const move = parseInt(userInput.value);
        moves.push(move);

        if (isWinner(move)) {
            win = true;
            endGame();
        } else {
            if (moves.length >= 10) {
                endGame();
            } else {
                help(move);
            }
        }

        userInput.value = "";
    }

    function endGame() {
        clearInterval(timer);

        if (win) {
            helpImage.setAttribute('src', 'assets/happy.png');
            statusContent.innerHTML = `<h1>Win in ${moves.length} moves</h1>`;
        } else {
            helpImage.setAttribute('src', 'assets/sad.png');
            statusContent.innerHTML = `<h1>You loose, the number is ${number}</h1>`;
        }
    }

    function isWinner(move) {
        return (move == number);
    }

    function help(move) {
        const playImage = document.createElement("img");
        playImage.style.width = "10px";

        if (move > number) {
            helpImage.setAttribute('src', 'assets/down.png');
            playImage.setAttribute('src', 'assets/down.png');
        } else {
            helpImage.setAttribute('src', 'assets/up.png');
            playImage.setAttribute('src', 'assets/up.png');
        }

        const listItem = document.createElement("li");
        listItem.textContent = isNaN(move) ? "Invalid value" : move;
        listItem.appendChild(playImage);
        gameList.appendChild(listItem);
    }

    window.addEventListener('load', init, false);
})();