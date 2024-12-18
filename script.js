const button = document.getElementById("playButton");
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");

// Resize canvas
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

// Confetti setup
let confetti = [];
const colors = ["#fde132", "#009bde", "#ff6f61"];

function createConfettiPiece() {
    return {
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height - confettiCanvas.height,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 1,
        angle: Math.random() * Math.PI * 2,
    };
}

function drawConfettiPiece(piece) {
    ctx.beginPath();
    ctx.arc(piece.x, piece.y, piece.size, 0, Math.PI * 2);
    ctx.fillStyle = piece.color;
    ctx.fill();
}

function updateConfettiPiece(piece) {
    piece.y += piece.speed;
    piece.x += Math.sin(piece.angle);
    if (piece.y > confettiCanvas.height) {
        piece.y = -10;
        piece.x = Math.random() * confettiCanvas.width;
    }
}

function renderConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confetti.forEach((piece) => {
        drawConfettiPiece(piece);
        updateConfettiPiece(piece);
    });
    requestAnimationFrame(renderConfetti);
}

// Music setup
button.addEventListener("click", () => {
    const audio = new Audio("https://www.bensound.com/bensound-music/bensound-birthday.mp3");
    audio.play();

    // Generate confetti
    if (confetti.length === 0) {
        for (let i = 0; i < 200; i++) {
            confetti.push(createConfettiPiece());
        }
        renderConfetti();
    }
});
