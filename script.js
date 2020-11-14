document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".grid div");
    const resultDisplay = document.querySelector("#score");
    let width = 15;
    let currentShooterIndex = 202;
    let currentInvaderIndex = 0;
    let alienInvadersTakenDown = [];
    let result = 0;
    let direction = 1;
    let invaderId;
    resultDisplay.textContent = "Score " + result;

    //define the invaders
    const alienInvaders = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
    ];
    //draw the invaders
    alienInvaders.forEach((invader) =>
        squares[currentInvaderIndex + invader].classList.add("invader")
    );

    //draw shooter
    squares[currentShooterIndex].classList.add("shooter");

    //moving shooter
    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove("shooter");
        if (e.keyCode == 37) {
            //console.log("I am reacting 37");
            if (currentShooterIndex / width !== 0) {
                currentShooterIndex -= 1;
            }
        } else if (e.keyCode == 39) {
            // console.log("I am reacting 37");
            if (currentShooterIndex / width < width - 1) {
                currentShooterIndex += 1;
            }
        }
        squares[currentShooterIndex].classList.add("shooter");
    }

    document.addEventListener("keydown", moveShooter);
    //move the alien invaders
    function moveInvaders() {
        const leftEdge = alienInvaders[0] / width;
        const rightEdge =
            alienInvaders[alienInvaders.length - 1] / width === width - 1;
        if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
            direction = width;
        } else if (direction === width) {
            if (leftEdge) {
                direction = 1;
            }
            direction = -1;
        }
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            // console.log("alienInvaders :", alienInvaders);
            // console.log("alienInvaders.length:", alienInvaders.length);
            // console.log("alienInvaders[i] :", alienInvaders[i]);

            squares[alienInvaders[i]].classList.remove("invader");
        }
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            alienInvaders[i] += direction;
        }
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            if (!alienInvadersTakenDown.includes(i)) {
                squares[alienInvaders[i]].classList.add("invader");
            }
        }

        //game over case
        if (
            squares[currentShooterIndex].classList.contains(
                "invader",
                "shooter"
            )
        ) {
            // resultDisplay.textContent = "Game Over!";
            showGameOver();
            squares[currentShooterIndex].classList.add("boom");

            clearInterval(invaderId);
        }

        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            if (alienInvaders[i] > squares.length - (width - 1)) {
                // resultDisplay.textContent = "Game Over!";
                showGameOver();
                clearInterval(invaderId);
            }
        }

        //the win situation
        if (alienInvadersTakenDown.length === alienInvaders.length) {
            resultDisplay.textContent = "You Win!";
            clearInterval(invaderId);
        }
    }
    invaderId = setInterval(moveInvaders, 500);

    function shoot(e) {
        console.log(currentShooterIndex);
        let laserId;
        let currentLaserIndex = currentShooterIndex;

        //laser has to move up: //buggers
        function moveLaser() {
            squares[currentLaserIndex].classList.remove("laser");
            currentLaserIndex -= width;
            squares[currentLaserIndex].classList.add("laser");
            if (squares[currentLaserIndex].classList.contains("invader")) {
                squares[currentLaserIndex].classList.remove("laser");
                squares[currentLaserIndex].classList.remove("invader");
                squares[currentLaserIndex].classList.add("boom");

                setTimeout(
                    () => squares[currentLaserIndex].classList.remove("boom"),
                    250
                );
                clearInterval(laserId);

                const alienTakenDown = alienInvaders.indexOf(currentLaserIndex);
                alienInvadersTakenDown.push(alienTakenDown);
                result++;
                resultDisplay.textContent = "Score " + result;
            }
            if (currentLaserIndex < width) {
                clearInterval(laserId);
                setTimeout(
                    () => squares[currentLaserIndex].classList("laser"),
                    100
                );
            }
        }
        document.addEventListener("keyup", (e) => {
            if (e.keyCode === 38) {
                laserId = setInterval(moveLaser, 100);
            }
        });

        // switch (e.keyCode) {
        //     case 38:
        //         console.log("I work - 32");
        //         laserId = setInterval(moveLaser, 100);
        //         break;
        // }
    }

    document.addEventListener("keydown", function (e) {
        if (e.keyCode == 38) {
            shoot();
        }
    });
});

function showGameOver() {
    const div = document.getElementById("gameOver");
    div.style.visibility = "visible";
}
// function drawScore(score) {
//     const scoreDiv = document.getElementById("score");

//     scoreDiv.innerHTML = "Score " + score;
// }

// function drawLives(lives) {
//     const scoreDiv = document.getElementById("lives");

//     scoreDiv.innerHTML = "Lives " + lives;
// }
// function showGameOver() {
//     const gameOver = document.getElementById("gameOver");
//     gameOver.style.visibility = "visible";
// }
