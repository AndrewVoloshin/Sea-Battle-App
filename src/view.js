import { getIdPosition } from "./modules/utils.js";
import { computerShips } from "./controller.js";
import { humanShips } from "./controller.js";
// import { humanShips } from './src/humanShips.js';

export function gameStart() {
  document.querySelector(".modal__button").style.display = "none";
  document.querySelector(".modal__window").classList.add("modal__window_on");
}

export function render() {
  document.querySelector(".modal").style.display = "none";
  document.querySelector(".gameboard").style.display = "flex";
}

export function changeInfoFrame(str) {
  const div = document.createElement("div");
  document.querySelector(".frame-info").appendChild(div);
  div.classList.add("info");
  div.innerHTML = str;
  let domElems = document.querySelectorAll(".info");
  if (domElems.length >= 3) {
    domElems[0].classList.add("remove");
  }
  if (domElems.length == 4) {
    domElems[0].remove();
    domElems[1].classList.add("remove");
  }
}

export function createBattleField(player) {
  const table = document.createElement("table");
  document.querySelector(".gameboard").appendChild(table);
  table.classList.add(`table-${player}`);

  const th = document.createElement("th");
  table.appendChild(th);
  th.innerHTML = " ";

  for (let i = 1; i <= 10; i++) {
    const th = document.createElement("th");
    table.appendChild(th);
    th.innerHTML = `${String.fromCharCode(64 + i)}`;
  }

  for (let i = 0; i < 10; i++) {
    const tr = document.createElement("tr");
    table.appendChild(tr);

    const th = document.createElement("th");
    tr.appendChild(th);
    th.innerHTML = `${i}`;

    for (let y = 1; y <= 10; y++) {
      const td = document.createElement("td");
      tr.appendChild(td);
      let forId = String.fromCharCode(64 + y);
      td.setAttribute("id", `${forId}${i}-${player}`);
    }
  }
  let caption = document.createElement("caption");
  table.appendChild(caption);
  caption.innerHTML = ` ${player}`;
  caption.style.fontSize = "30px";
}
export function showShips(ships, player) {
  ships.forEach((ship) =>
    ship.sections.forEach((section) => {
      if (section.position !== null) {
        let id = getIdPosition(section.position);
        document.getElementById(`${id}-${player}`).classList.add("ship");
      }
    })
  );
}

export function showComputerField(event) {
  document.getElementById(`${event.target.id}`).classList.add("miss");
  computerShips.forEach((ship) => {
    ship.sections.forEach((section) => {
      if (section.isHit) {
        let id = `${getIdPosition(section.position)}-computer`;
        document.getElementById(`${id}`).classList.add("hit");
        document.getElementById(`${id}`).classList.remove("miss");
      }
    });
  });
}

export function showHumanField() {
  let computerShot = localStorage.getItem("computerShot");
  let computerShotId = `${getIdPosition(computerShot)}-human`;
  document.getElementById(`${computerShotId}`).classList.add("miss");
  humanShips.forEach((ship) => {
    ship.sections.forEach((section) => {
      if (section.isHit) {
        let id = `${getIdPosition(section.position)}-human`;
        document.getElementById(`${id}`).classList.add("hit");
        document.getElementById(`${id}`).classList.remove("miss");
      }
    });
  });
}

// export function showField(ships, playerShot, player) {
//   playerShot = localStorage.getItem(`${playerShot}`);
//   let shotId = `${getIdPosition(playerShot)}-${player}`;
//   document.getElementById(`${shotId}`).classList.add("miss");
//   ships.forEach((ship) => {
//     ship.sections.forEach((section) => {
//       if (section.isHit) {
//         let id = `${getIdPosition(section.position)}-human`;
//         document.getElementById(`${id}`).classList.add("hit");
//         document.getElementById(`${id}`).classList.remove("miss");
//       }
//     });
//   });
// }
