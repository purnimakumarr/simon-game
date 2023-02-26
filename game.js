let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;
let timeout;

$("body").on("keydown", function () {
  if (!started) {
    $(".title").html("Level 0");
    nextSequence();
    started = true;
  }
});

function playSound(name) {
  let audioElement = document.createElement("audio");
  audioElement.setAttribute("src", `sounds/${name}.mp3`);
  audioElement.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  timeout = setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}
clearTimeout(timeout);

function checkAnswer(currentLevel) {
  console.log(gamePattern);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      timeout = setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    let audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "sounds/wrong.mp3");
    audioElement.play();
    $("body").addClass("game-over");
    timeout = setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $(".title").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}
clearTimeout();

function nextSequence() {
  userClickedPattern = [];

  level++;
  $(".title").html(`Level ${level}`);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function startOver() {
  started = false;
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
}

$(".btn").on("click", function () {
  let userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});
