var gameseq = [];
var userseq = [];
let colors = ["red", "green", "blue", "yellow"];
var h3 = document.querySelector("h3");
var allbtns = document.querySelectorAll(".btn");
var sbtn = document.querySelector(".sbtn");
var started = false;
var level = 0;
var maxi = 0;
let curscore = document.querySelector("#score");
let high = document.querySelector("#high");

sbtn.addEventListener("click", function () {
    if (!started) {
        started = true;
        levelup();
    }
});

function playSound(it) {
    var audio = new Audio(`src/${it}.mp3`);
    audio.play();
}

function btnflash(btn) {
    btn.classList.add("flash");
    playSound(btn.id);
    setTimeout(() => btn.classList.remove("flash"), 300);
}

function userflash(btn) {
    btn.classList.add("uflash");
    playSound(btn.id);
    setTimeout(() => btn.classList.remove("uflash"), 300);
}

function levelup() {
    userseq = [];
    level++;
    maxi = Math.max(maxi, level);
    h3.innerText = `Level ${level}`;

    var randomcolor = colors[Math.floor(Math.random() * 4)];
    var ranbtn = document.querySelector(`.${randomcolor}`);
    gameseq.push(randomcolor);

    btnflash(ranbtn);
}

function checkans(index) {
    if (gameseq[index] === userseq[index]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h3.innerText = "Game Over!";
        document.body.classList.add("shake");
        setTimeout(() => document.body.classList.remove("shake"), 500);
        score();
        reset();
    }
}

function btnpress() {
    var btn = this;
    var ucolor = btn.id;
    userseq.push(ucolor);
    userflash(btn);
    checkans(userseq.length - 1);
}

allbtns.forEach(btn => btn.addEventListener("click", btnpress));

function reset() {
    gameseq = [];
    userseq = [];
    started = false;
    level = 0;
}

function score() {
    let scorecard = document.querySelector(".scorecard");
    scorecard.style.display = "flex";
    playSound(score);
    curscore.innerText = level - 1;
    high.innerText = maxi - 1;
    document.querySelector("#ok").addEventListener("click", () => {
        scorecard.style.display = "none";
    });
}
