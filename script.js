document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".grid div");
    const resultDisplay = document.querySelector("#result");
    let width = 15;
    let currentShooterIndex = 202;
    let currentInvaderIndex = 0;
    let alienInvadersTakenDown = [];
    let result = 0;
    let direction = 1;
    let invaderId;

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
    const leftEdge = alienInvaders[0] / width === 0;
    const rightEdge =
        alienInvaders[alienInvaders.length - 1] / width === width - 1;
    if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
        direction = width;
    }
});
