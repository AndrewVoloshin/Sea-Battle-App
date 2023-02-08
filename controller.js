import{createBattleField,showShips} from './view.js'
import{ createShipsForComputer,createHumanShips,checkShotOnValid,checkShotOnRepeat,createShipsObjects} from './model.js'
import{ humanShootAtShip,computerShootAtShips,checkWhoWin,fireSecondShot,fireSecondShotComuter,chooseDifficult} from './model.js'
import{showComputerField,showHumanField,changeInfoFrame} from './view.js'
// import { humanShips } from './src/humanShips.js';
import{gameStart,render} from './view.js'
localStorage.clear()

export const gameLogic ={
  shipObj:[4,3,3,2,2,2,1,1,1,1],
  isCreateHumanShips: false,
  isGameOver:false,
  isChooseDifficult:false,
  isDark:true,
  difficult:{
    simple:false,
    normal: false,
    heavy: false,
  }
}

document.querySelector('.toggle-wrap').onclick= function(){
  if(gameLogic.isDark) {
    document.body.classList.add('toggle-var')
    gameLogic.isDark = false
  } else {
    document.body.classList.remove('toggle-var')
    gameLogic.isDark = true
  }
}

document.querySelector('.modal__button').onclick= function(event){
  gameStart(event)
}
document.querySelector('.modal__window').onclick= function(event){
  chooseDifficult(event)
  if(gameLogic.isChooseDifficult) render()
}

export const humanShips =createShipsObjects(gameLogic.shipObj)
export const computerShips =createShipsObjects(gameLogic.shipObj)
  
createBattleField('comp')
createBattleField('human')
changeInfoFrame('Create ships please')
createShipsForComputer()
// showShips(computerShips,'comp')

document.querySelector('.table-human').onclick = function(event){
  if( gameLogic.isCreateHumanShips ) return 
  createHumanShips(event)
  showShips(humanShips,'human')
  changeInfoFrame(localStorage.getItem('humanMsg'))
  if(gameLogic.isCreateHumanShips) changeInfoFrame("Let's shoot on ships")
} 

document.querySelector('.table-comp').onclick = function (event){
  
  if ( !checkShotOnValid(event)) return
  if( !gameLogic.isCreateHumanShips) return changeInfoFrame('Create your ships')
  if( gameLogic.isGameOver ) return
  if (!checkShotOnRepeat(event)) return changeInfoFrame('Shot is repeat')
  humanShootAtShip(event)
  changeInfoFrame(localStorage.getItem('humanMsg'))
  showComputerField(event)
  
  gameLogic.isGameOver = checkWhoWin(computerShips,'human')
  if(gameLogic.isGameOver) return changeInfoFrame('Human win!')
  if ( fireSecondShot(event) ) return
  setTimeout(computerShoot,1000)
  
} 

function computerShoot(){
  if( gameLogic.isGameOver ) return
  computerShootAtShips()
  showHumanField()
  changeInfoFrame(localStorage.getItem('humanMsg'))
  gameLogic.isGameOver = checkWhoWin(humanShips,'computer')
  if(gameLogic.isGameOver) return changeInfoFrame('Computer win!')
  if (fireSecondShotComuter()) setTimeout(computerShoot,1000)
}