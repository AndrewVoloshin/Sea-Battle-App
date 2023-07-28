import { createBattleField, showShips } from "./view.js";
import {
  createShipsForComputer,
  createHumanShips,
  checkShotOnValid,
  checkShotOnRepeat,
  createShipsObjects,
} from "./model.js";
import {
  humanShootAtShip,
  computerShootAtShips,
  checkWhoWin,
  fireSecondShot,
  fireSecondShotComuter,
  chooseDifficult,
} from "./model.js";
import { showComputerField, showHumanField, changeInfoFrame } from "./view.js";
// import { humanShips } from './src/humanShips.js';
import { gameStart, render } from "./view.js";
localStorage.clear();

export const gameLogic = {
  shipSectionsParam: [4, 3, 3, 2, 2, 2, 1, 1, 1, 1],
  isCreateHumanShips: false,
  isGameOver: false,
  isChooseDifficult: false,
  isDark: true,
  difficult: {
    simple: true,
    normal: false,
    heavy: false,
  },
};

document.querySelector(".toggle-theme").onclick = function () {
  document.body.classList.toggle("theme-light");
  gameLogic.isDark = !gameLogic.isDark;
};

document.querySelector(".modal__button").onclick = () => gameStart();
document.querySelector(".modal__window").onclick = function (event) {
  chooseDifficult(event);
  if (gameLogic.isChooseDifficult) render();
};

render();

export const humanShips = createShipsObjects(gameLogic.shipSectionsParam);
export const computerShips = createShipsObjects(gameLogic.shipSectionsParam);

createBattleField("computer");

createBattleField("human");
changeInfoFrame("Create ships please");
createShipsForComputer();
// console.log(computerShips, "computerShips");
showShips(computerShips, "computer");

document.querySelector(".table-human").onclick = function (event) {
  if (gameLogic.isCreateHumanShips) return;
  createHumanShips(event);
  showShips(humanShips, "human");
  changeInfoFrame(localStorage.getItem("humanMsg"));
  if (gameLogic.isCreateHumanShips) changeInfoFrame("Let's shoot on ships");
};

document.querySelector(".table-computer").onclick = function (event) {
  if (!checkShotOnValid(event)) return;
  if (!gameLogic.isCreateHumanShips)
    return changeInfoFrame("Create your ships");
  if (gameLogic.isGameOver) return;
  if (!checkShotOnRepeat(event)) return changeInfoFrame("Shot is repeat");
  humanShootAtShip(event);
  changeInfoFrame(localStorage.getItem("humanMsg"));
  showComputerField(event);

  gameLogic.isGameOver = checkWhoWin(computerShips, "human");
  if (gameLogic.isGameOver) return changeInfoFrame("Human win!");
  if (fireSecondShot(event)) return;
  setTimeout(computerShoot, 1000);
};

function computerShoot() {
  if (gameLogic.isGameOver) return;
  computerShootAtShips();
  showHumanField();
  changeInfoFrame(localStorage.getItem("humanMsg"));
  gameLogic.isGameOver = checkWhoWin(humanShips, "computer");
  if (gameLogic.isGameOver) return changeInfoFrame("Computer win!");
  if (fireSecondShotComuter()) setTimeout(computerShoot, 1000);
}
