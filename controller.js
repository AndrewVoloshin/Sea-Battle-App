import{createBattleField} from './view.js'
import{ createShipsForComputer,createHumanShips} from './model.js'
import{ humanShootAtShip,computerShootAtShips,checkWhoWin,fireSecondShot,fireSecondShotComuter} from './model.js'
import { computerShips } from "./src/computerShips.js"
import {humanShips} from './src/humanShips.js'
import{showHumanShips,showComputerField,showHumanField} from './view.js'
localStorage.clear()

export const logic ={
isCreateHumanShips: false,
isGameOver:false,
}

createBattleField('comp')
createBattleField('human')
createShipsForComputer()

document.querySelector('.table-human').onclick = function(event){
  if( logic.isCreateHumanShips ) return
    createHumanShips(event)
    showHumanShips()
} 

document.querySelector('.table-comp').onclick = function (event){
  if(logic.isCreateHumanShips){
    if( logic.isGameOver ) return
    humanShootAtShip(event)
    showComputerField(event)
    logic.isGameOver = checkWhoWin(computerShips,'human')
    if ( fireSecondShot(event) ) return
    computerShoot()
  } else console.log('create your ships');
} 

function computerShoot(){
  if( logic.isGameOver ) return
  computerShootAtShips()
  showHumanField()
  logic.isGameOver = checkWhoWin(humanShips,'computer')
  if (fireSecondShotComuter()) return computerShoot()
}