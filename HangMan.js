const buttonSet = document.querySelector("#alphabetButtonSet");
const answerDiv = document.querySelector("#answerDiv");
const curtain = document.getElementById("curtain");

let answer;
let playerAnswer;
let wrongCnt;
let isGameOver;
const checkAlphabet = (alphabetButton) => {
  let alphabet = alphabetButton.innerText;
  let offset = -1;
  let isCorrect = false;
  if (isGameOver) return;
  while (true) {
    offset = answer.indexOf(alphabet, offset + 1);
    if (offset == -1) break;
    isCorrect = true;
    playerAnswer[offset] = alphabet;
  }
  if (isCorrect) {
    answerDiv.innerText = playerAnswer.join(" ");
    alphabetButton.style.backgroundColor = "green";
    if (!playerAnswer.includes("_")) {
      isGameOver = true;
      curtain.style.display = "block";
      setTimeout(() => {
        afterGameEnd(1);
      }, 100);
    }
  } else {
    alphabetButton.style.backgroundColor = "red";
    wrongCnt--;
    paintHangMan();
    if (wrongCnt == 0) {
      isGameOver = true;
      curtain.style.display = "block";
      setTimeout(() => {
        afterGameEnd(-1);
      }, 100);
    }
  }
  alphabetButton.style.boxShadow = "1px 1px 5px black inset";
  alphabetButton.style.color = "white";
  alphabetButton.onclick = undefined;
};

const paintHangMan = () => {
  const img = document.querySelector("#imgContainer>img");
  img.src = `imgs/${wrongCnt}.jpg`;
};

const initGame = () => {
  isGameOver = false;
  let buttonSetString = "";
  let cnt = 1;
  wrongCnt = 8;
  for (let i = 65; i <= 90; i++) {
    let alphabet = String.fromCharCode(i);
    buttonSetString += `<Button id = "${alphabet}" onclick = "checkAlphabet(this)">${alphabet}</Button>`;
    if (cnt % 10 == 0) buttonSetString += "<br/>";
    cnt++;
  }
  buttonSet.innerHTML = buttonSetString;
  let answerString =
    hangManWords[Math.floor(Math.random() * hangManWords.length)].toUpperCase();
  playerAnswer = [];
  for (let i = 0; i < answerString.length; i++) playerAnswer.push("_");
  answerDiv.innerHTML = playerAnswer.join(" ");
  answer = answerString.split("");

  paintHangMan();
};

const afterGameEnd = (n) => {
  switch (n) {
    case 1:
      alert("WIN");
      break;
    case -1:
      alert(`GAME OVER\n정답은 ${answer.join("")}이었습니다.`);
      break;
  }
  if (confirm("게임을 다시 시작하겠습니까?")) initGame();
  curtain.style.display = "none";
};

initGame();
