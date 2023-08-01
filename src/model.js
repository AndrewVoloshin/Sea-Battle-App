import { getIdPosition, getNumberPosition } from "./modules/utils.js";
import { computerShips } from "./controller.js";
import { humanShips } from "./controller.js";
// import { humanShips } from './src/humanShips.js';
import { gameLogic } from "./controller.js";
const dataComp = {
  computerBusyCells: [],
  computerShotsHistory: [],
  shipToSmartSink: {},
  busyCellsSmartShot: [],
};

export function showBusyField() {
  console.log(dataComp.computerBusyCells, "dataComp.computerBusyCells");
  dataComp.computerBusyCells.forEach((cell) => {
    if (cell < 0) return;
    let id = getIdPosition(cell);
    document.getElementById(`${id}-computer`).classList.add("busy");
  });
}

const dataHuman = {
  numberShip: 0,
  numberSection: 0,
  humanBusyCells: [],
  humanShotsHistory: [],
};

export function chooseDifficult(event) {
  for (let key in gameLogic.difficult) {
    gameLogic.difficult[key] = key == event.target.id ? true : false;
    if (gameLogic.difficult[key]) gameLogic.isChooseDifficult = true;
  }
}

export function createShipsObjects(propsShips) {
  const ships = [];
  for (let numShip = 0; numShip < 10; numShip++) {
    let shipObj = {
      isSink: false,
      sections: [],
    };
    for (let numSection = 0; numSection < propsShips[numShip]; numSection++) {
      let shipSections = {
        position: null,
        isHit: false,
      };
      shipObj.sections.push(shipSections);
    }
    ships.push(shipObj);
  }
  console.log(ships);
  return ships;
}

//CREATE SHIPS FOR COMPUTER
export function createShipsForComputer(numShip = 0) {
  const props = {
    numberByX: null,
    numberByY: null,
    randomNum: null,
    verticalPosition: false,
    horizontalPosition: false,
    numberShip: numShip,
    isCreateComputerShips: false,
  };

  createRandomCellShip(props);
  console.log(props, "props");

  if (!fillCellsShip(props)) {
    return createShipsForComputer(props.numberShip);
  }

  if (checkCellShipsOnBusyPlace(props, dataComp)) {
    fillcomputerBusyCells(props, dataComp.computerBusyCells); ////heere
  } else return createShipsForComputer(props.numberShip);

  checkEndCreateShips(props);
  if (props.numberShip <= computerShips.length - 1) {
    createShipsForComputer(props.numberShip);
  }
}

function createRandomCellShip(props) {
  props.randomNum = Math.floor(Math.random() * 100);
  const numberSplit = ("" + props.randomNum).split("").map(Number);
  if (props.randomNum < 10) {
    props.numberByX = 0;
    props.numberByY = numberSplit[0];
  } else {
    props.numberByX = numberSplit[0];
    props.numberByY = numberSplit[1];
  }
  !(props.randomNum % 2) ? (props.horizontalPosition = true) : (props.verticalPosition = true);
}

function fillCellsShip({ randomNum, numberByX, numberByY, horizontalPosition, verticalPosition, numberShip }) {
  computerShips[numberShip].sections[0].position = randomNum;
  if (verticalPosition && numberByY <= 10 - computerShips[numberShip].sections.length) {
    for (let i = 1; i <= computerShips[numberShip].sections.length - 1; i++) {
      randomNum += 1;
      computerShips[numberShip].sections[i].position = randomNum;
    }
    return true;
  } else if (horizontalPosition && numberByX <= 10 - computerShips[numberShip].sections.length) {
    for (let i = 1; i <= computerShips[numberShip].sections.length - 1; i++) {
      randomNum += 10;
      computerShips[numberShip].sections[i].position = randomNum;
    }
    return true;
  } else {
    return false;
  }
}

function checkCellShipsOnBusyPlace(props, { computerBusyCells }) {
  let isRepeat = computerShips[props.numberShip].sections.some((section) => {
    return computerBusyCells.some((cell) => section.position == cell);
  });
  return isRepeat ? false : true;
}

function addPositionsToComputerBusyCells(sectionPosition, positions) {
  positions.forEach((position) => dataComp.computerBusyCells.push(sectionPosition + position));
}

function fillcomputerBusyCells(props, computerBusyCells) {
  computerShips[props.numberShip].sections.forEach((section) => {
    computerBusyCells.push(section.position);
    if (props.verticalPosition) {
      if (!((section.position + 1) % 10) && section.position > 10) {
        addPositionsToComputerBusyCells(section.position, [-10, -1, -11]);
        if (section.position < 90) {
          addPositionsToComputerBusyCells(section.position, [9, 10]);
        }
      }
      if (section.position < 10) {
        addPositionsToComputerBusyCells(section.position, [-1, 9, 10]);
        if ((section.position + 1) % 10) {
          addPositionsToComputerBusyCells(section.position, [1, 9, 10]);
        }
      }
      if ((section.position + 1) % 10 && section.position > 10 && section.position < 90) {
        addPositionsToComputerBusyCells(section.position, [-1, 9, 11, -9, -11, 1, 10, -10]);
      }
      if (section.position >= 90) {
        addPositionsToComputerBusyCells(section.position, [-1, -11, -10]);

        if ((section.position + 1) % 10) {
          addPositionsToComputerBusyCells(section.position, [1, -9]);
        }
      }
    }
    if (props.horizontalPosition) {
      if (section.position < 10 && section.position !== 0) {
        addPositionsToComputerBusyCells(section.position, [1, -1, 11, 10, 9]);
      }
      if (section.position == 0) {
        addPositionsToComputerBusyCells(section.position, [1, 10, 11]);
      }
      if (!(section.position % 10) && section.position >= 90) {
        addPositionsToComputerBusyCells(section.position, [1, -10, -9]);
      }
      if (!(section.position % 10) && section.position !== 0 && section.position + 10 < 100) {
        addPositionsToComputerBusyCells(section.position, [10, 11, -9, -10, 1]);
      }
      if (section.position % 10 && section.position > 10) {
        addPositionsToComputerBusyCells(section.position, [-9, -10, -11, 1, -1]);

        if (section.position + 10 < 100) {
          addPositionsToComputerBusyCells(section.position, [9, 10, 11]);
        }
      }
    }
  });
}

function checkEndCreateShips(props) {
  props.numberShip = 0;
  computerShips.forEach((ship) => {
    let localShips = ship.sections.filter((section) => section.position !== null);
    if (ship.sections.length == localShips.length) props.numberShip++;
  });
  props.isCreateComputerShips = computerShips.every((ship) =>
    ship.sections.every((section) => section.position !== null)
  );
  console.log(computerShips);
}

// CREATE HUMAN SHIPS

export function createHumanShips(event) {
  let humanShot = getNumberPosition(event.target.id);
  if (!checkOnRepeatCell(humanShot)) return localStorage.setItem("humanMsg", "repeat cell, change other cell");
  createShips(humanShot);
  if (checkCreateShips()) {
    localStorage.setItem("humanMsg", "All ships are create");
    gameLogic.isCreateHumanShips = true;
  }
}

function createShips(humanShot) {
  dataHuman.humanBusyCells.push(humanShot);
  if (humanShips[dataHuman.numberShip].sections[dataHuman.numberSection]) {
    humanShips[dataHuman.numberShip].sections[dataHuman.numberSection].position = humanShot;
    dataHuman.numberSection++;
  } else {
    dataHuman.numberSection = 0;
    dataHuman.numberShip++;
    humanShips[dataHuman.numberShip].sections[dataHuman.numberSection].position = humanShot;
    dataHuman.numberSection++;
  }
  localStorage.setItem(
    "humanMsg",
    `you create sections ${dataHuman.numberSection} of ${humanShips[dataHuman.numberShip].sections.length}`
  );
}

function checkCreateShips() {
  return humanShips.every((ship) => ship.sections.every((section) => section.position !== null));
}

function checkOnRepeatCell(humanShot) {
  return dataHuman.humanBusyCells.every((place) => place !== humanShot);
}

// HUMAN SHOOT AT SHIPS

export function humanShootAtShip(event) {
  const inputShot = getNumberPosition(event.target.id);
  localStorage.setItem("humanShot", inputShot);
  addShotToHistory(inputShot);
  checkByHit(inputShot);
  checkBySink(inputShot);
}

export function checkShotOnValid(event) {
  return event.target.tagName == "TD" ? true : false;
}

export function checkShotOnRepeat(event) {
  const inputShot = getNumberPosition(event.target.id);
  return dataHuman.humanShotsHistory.every((item) => item !== inputShot);
}

function addShotToHistory(inputShot) {
  dataHuman.humanShotsHistory.push(inputShot);
}

function checkByHit(inputShot) {
  const isHit = computerShips.some((ship) =>
    ship.sections.some((section) => {
      if (inputShot == section.position) {
        section.isHit = true;
        return true;
      }
    })
  );
  isHit ? localStorage.setItem("humanMsg", `You hit`) : localStorage.setItem("humanMsg", `You miss`);
}

function checkBySink(inputShot) {
  let localShip;
  computerShips.forEach((ship) => {
    ship.isSink = ship.sections.every((section) => {
      if (section.position == inputShot) {
        localShip = ship;
      }
      return section.isHit;
    });
  });
  if (localShip && localShip.isSink) {
    localStorage.setItem("humanMsg", `You sunk`);
  }
}

// SHOOT COMPUTER

export function computerShootAtShips() {
  let computerShot;
  if (gameLogic.difficult.simple) {
    computerShot = Math.floor(Math.random() * 100);
  }
  if (gameLogic.difficult.normal || gameLogic.difficult.heavy) {
    computerShot = chooseShot(dataComp);
  }
  localStorage.setItem("computerShot", computerShot);
  if (checkComputerShotOnRepeat(computerShot) && checkComputerSmartShot(computerShot)) {
    addComputerShotToHistory(computerShot);
  } else return computerShootAtShips();
  checkComputerByHit(computerShot);
  checkHumanShipsBySink();
  checkSmartShotBySink(dataComp);
  if (dataComp.shipToSmartSink.isSink) addBusyCellsOnSmartShot(dataComp);
}

function chooseShot({ shipToSmartSink }) {
  let localComputerShot;
  if (shipToSmartSink.isSink || shipToSmartSink.isSink == undefined) {
    localComputerShot = Math.floor(Math.random() * 100);
  } else {
    shipToSmartSink.sections.forEach((section) => {
      if (!section.isHit) {
        localComputerShot = section.position;
      }
    });
  }
  return localComputerShot;
}

function checkComputerShotOnRepeat(computerShot) {
  return dataComp.computerShotsHistory.every((item) => item !== computerShot);
}

function checkComputerSmartShot(computerShot) {
  return dataComp.busyCellsSmartShot.every((item) => item !== computerShot);
}

function addComputerShotToHistory(computerShot) {
  dataComp.computerShotsHistory.push(computerShot);
}

function checkComputerByHit(computerShot) {
  const isHit = humanShips.some((ship) =>
    ship.sections.some((section) => {
      if (computerShot == section.position) {
        dataComp.shipToSmartSink = { ...ship };
        return (section.isHit = true);
      }
    })
  );
  isHit ? localStorage.setItem("humanMsg", `Computer hit`) : localStorage.setItem("humanMsg", `Computer miss`);
}

function checkHumanShipsBySink() {
  humanShips.forEach((ship) => {
    ship.isSink = ship.sections.every((section) => section.isHit);
  });
}

function checkSmartShotBySink({ shipToSmartSink }) {
  if (Object.keys(shipToSmartSink).length !== 0 && shipToSmartSink.constructor == Object) {
    shipToSmartSink.isSink = shipToSmartSink.sections.every((section) => section.isHit);
  }
}

function addBusyCellsOnSmartShot({ busyCellsSmartShot }) {
  dataComp.shipToSmartSink.sections.forEach((section) => {
    if (section.position > 10 && section.position < 90 && section.position % 10 && (section.position + 1) % 10) {
      busyCellsSmartShot.push(section.position + 1);
      busyCellsSmartShot.push(section.position - 1);
      busyCellsSmartShot.push(section.position + 10);
      busyCellsSmartShot.push(section.position - 10);
      if (gameLogic.difficult.heavy) {
        busyCellsSmartShot.push(section.position + 9);
        busyCellsSmartShot.push(section.position - 9);
        busyCellsSmartShot.push(section.position - 11);
        busyCellsSmartShot.push(section.position + 11);
      }
    }
  });
  // busyCellsSmartShot.forEach((cell)=>{
  //   const computerShotId = `${getIdPosition(cell)}-human`
  //   document.getElementById( `${computerShotId}` ).classList.add('auto-ship_busy')
  // })
}

export function checkWhoWin(ships, player) {
  const isGameOver = ships.every((ship) => ship.isSink);
  if (isGameOver) {
    const humanMsg = `${player.toUpperCase()} ARE WIN!`;
    localStorage.setItem("humanMsg", humanMsg);
    return true;
  } else return false;
}

export function fireSecondShot(event) {
  const humanShot = getNumberPosition(event.target.id);
  return computerShips.some((ship) => ship.sections.some((section) => section.position == humanShot));
}

export function fireSecondShotComuter() {
  const computerShot = localStorage.getItem("computerShot");
  return humanShips.some((ship) => ship.sections.some((section) => section.position == computerShot));
}
