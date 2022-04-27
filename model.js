import { getIdPosition,getNumberPosition } from "./src/modules.js";
import { computerShips } from "./src/computerShips.js";
import {humanShips} from './src/humanShips.js'
import { logic } from './controller.js'

//CREATE SHIPS FOR COMPUTER
let busyPlacesOfShips=[]
export function createShipsForComputer(numShip=0){
  const props ={
    busyPlacesOfShips:[],
    numberByX:undefined,
    numberByY:undefined,
    randomNum:undefined,
    verticalPosition: false,
    horizontalPosition: false,
    numberShip:numShip,
    isCreateComputerShips:false
  }

  createRandomCellShip(props)

  if( ! fillCellsShip(props)){
    return createShipsForComputer(props.numberShip)
  }

  if ( checkCellShipsOnBusyPlace(props) ){
    fillBusyPlacesOfShips(props)
  } else return createShipsForComputer(props.numberShip)

  visualShip(props.numberShip)
  checkEndCreateShips(props)
  if(props.numberShip<=computerShips.length-1){
    createShipsForComputer(props.numberShip)
  }
}

function createRandomCellShip(props){
  props.randomNum= Math.floor(Math.random()*100)
  const numberSplit =  (""+props.randomNum).split("").map(Number)
  if(props.randomNum<10){
    props.numberByX = 0
    props.numberByY = numberSplit[0]
  } else{ 
    props.numberByX = numberSplit[0]
    props.numberByY = numberSplit[1]
  }
  !(props.randomNum % 2) ? props.horizontalPosition = true : props.verticalPosition= true
}

function fillCellsShip({randomNum,numberByX,numberByY, horizontalPosition, verticalPosition,numberShip}){
  computerShips[numberShip].sections[0].position = randomNum
  if( verticalPosition && numberByY <= (10 - computerShips[numberShip].sections.length) ){
    for (let i=1; i<=computerShips[numberShip].sections.length-1; i++){
      randomNum = randomNum +1
      computerShips[numberShip].sections[i].position = randomNum
    }
    return true
  } else if( horizontalPosition && numberByX <= (10 - computerShips[numberShip].sections.length)){
    for(let i=1; i<=computerShips[numberShip].sections.length-1; i++){
      randomNum = randomNum +10
      computerShips[numberShip].sections[i].position = randomNum
    }
    return true
  } else {
    return false
  }
} 

function checkCellShipsOnBusyPlace({numberShip}){ 
  let localBusyShips=[]
    computerShips[numberShip].sections.forEach((section)=>{
      busyPlacesOfShips.filter((place)=>{
        localBusyShips.push (section.position == place)
      })
    }) 
  let newArray=localBusyShips.filter(item=>item)
  if(!newArray.length) {
    return true
  } else return false
}

function fillBusyPlacesOfShips({horizontalPosition, verticalPosition,numberShip}){
  computerShips[numberShip].sections.forEach((section)=>{
    busyPlacesOfShips.push(section.position)
     if(verticalPosition){
       if ( !((section.position+1)%10) && section.position >10 ){
        busyPlacesOfShips.push(section.position-10)
        busyPlacesOfShips.push(section.position-1)
        busyPlacesOfShips.push(section.position-11)
        if( section.position<90 ){
          busyPlacesOfShips.push(section.position+9)
          busyPlacesOfShips.push(section.position+10)
        }
       }
      if (section.position<10 ){
        busyPlacesOfShips.push(section.position-1)
        busyPlacesOfShips.push(section.position+10)
        busyPlacesOfShips.push(section.position+9)
        if( ( (section.position+1)%10 ) ){
          busyPlacesOfShips.push(section.position+1)
          busyPlacesOfShips.push(section.position+11)
          busyPlacesOfShips.push(section.position+9)
        }
      }
      if ((section.position+1)%10 && section.position> 10 && section.position<90){
        busyPlacesOfShips.push(section.position-1)
        busyPlacesOfShips.push(section.position+9)
        busyPlacesOfShips.push(section.position+11)
        busyPlacesOfShips.push(section.position-9)
        busyPlacesOfShips.push(section.position-11)
        busyPlacesOfShips.push(section.position+1)
        busyPlacesOfShips.push(section.position+10)
        busyPlacesOfShips.push(section.position-10)
      }
      if(section.position>=90  ){
        busyPlacesOfShips.push(section.position-1)
        busyPlacesOfShips.push(section.position-11)
        busyPlacesOfShips.push(section.position-10)
        if((section.position+1)%10){
          busyPlacesOfShips.push(section.position+1)
          busyPlacesOfShips.push(section.position-9)
        }
      }
    }
    if(horizontalPosition){
      if(section.position <10 && section.position !==0){
        busyPlacesOfShips.push(section.position+1)
        busyPlacesOfShips.push(section.position-1)
        busyPlacesOfShips.push(section.position+11)
        busyPlacesOfShips.push(section.position+10)
        busyPlacesOfShips.push(section.position+9)
      }
      if(section.position ==0){
        busyPlacesOfShips.push(section.position+1)
        busyPlacesOfShips.push(section.position+10)
        busyPlacesOfShips.push(section.position+11)
      }
      if( !(section.position%10) && section.position >=90   ){
        busyPlacesOfShips.push(section.position+1)
        busyPlacesOfShips.push(section.position-10)
        busyPlacesOfShips.push(section.position-9)
      }
      if( !(section.position%10) && section.position!==0 && (section.position+10)<100 ){
        busyPlacesOfShips.push(section.position+10)
        busyPlacesOfShips.push(section.position+11)
        busyPlacesOfShips.push(section.position-9)
        busyPlacesOfShips.push(section.position-10)
        busyPlacesOfShips.push(section.position+1)
      }
      if( (section.position%10) && section.position>10 ){
        busyPlacesOfShips.push(section.position-9)
        busyPlacesOfShips.push(section.position-10)
        busyPlacesOfShips.push(section.position-11)
        busyPlacesOfShips.push(section.position+1)
        busyPlacesOfShips.push(section.position-1)
        if((section.position+10)<100 ){
          busyPlacesOfShips.push(section.position+9)
          busyPlacesOfShips.push(section.position+10)
          busyPlacesOfShips.push(section.position+11)
        }
      }    
    }
  })
}

function visualShip(numberShip){
  computerShips[numberShip].sections.forEach((section)=>{
    let IdPosition = getIdPosition(section.position)
    document.getElementById(`${IdPosition}-comp`).classList.add('auto-ship')
  })
}

function checkEndCreateShips(props){
  props.numberShip=0
  computerShips.forEach((ship)=>{
    let localShips = ship.sections.filter((section)=>section.position !== undefined)
    if (ship.sections.length == localShips.length) props.numberShip++
  })
   props.isCreateComputerShips=computerShips.every((ship=>ship.sections.every((section)=>section.position!==undefined)))
}

// CREATE HUMAN SHIPS

let numberShip=0
let numberSection=0
const busyPlace=[]
export function createHumanShips (event){
    let humanShot = getNumberPosition(event.target.id)
    if( !checkOnRepeatCell(humanShot) ) return console.log("repeat cell, change other cell");
    if (  ! checkCreateShips() ){
        createShips(humanShot)

    } else {
        console.log(humanShips,'humanShips');
        console.log( 'all ships are create');
        console.log('Human shoot on ships');
        logic.isCreateHumanShips= true
    }
}

function createShips(humanShot){
    busyPlace.push(humanShot)
    if(humanShips[numberShip].sections[numberSection]){
        humanShips[numberShip].sections[numberSection].position = humanShot
        numberSection++
        humanShips[numberShip].sections[numberSection] ? console.log('next section') : console.log('next ship' ) 
    }  else {
        numberSection =0
        numberShip++
        console.log(` ship has ${humanShips[numberShip].sections.length} sections`);
        humanShips[numberShip].sections[numberSection].position= humanShot
        numberSection++
    } 
}

function checkCreateShips(){
    return humanShips.every((ship)=>ship.sections.every((section)=> section.position !== undefined))
}

function checkOnRepeatCell(humanShot){
    return busyPlace.every((place)=> place !== humanShot)
}


// HUMAN SHOOT AT SHIPS

let humanShotsHistory=[]
export function humanShootAtShip(event){
  if (!checkShotOnValid(event)) return // remake cause human dont shoot
  let inputShot = getNumberPosition(event.target.id)
  if( checkShotOnRepeat(inputShot) ){
    addShotToHistory(inputShot)
  } else return console.log('shot is repeat');
    checkByHit(inputShot)
    checkBySink()
}

function checkShotOnValid(event){
  return (event.target.tagName == 'TD') ? true : false
}

function checkShotOnRepeat(inputShot){
    return humanShotsHistory.every((item)=> item !== inputShot)
}

function addShotToHistory(inputShot){
    humanShotsHistory.push(inputShot)
}

function checkByHit(inputShot){
    computerShips.forEach((ship)=>ship.sections.forEach((section)=>{
        if (inputShot == section.position){
            section.isHit = true
        }
    }))
}

function checkBySink(){
    computerShips.forEach((ship)=>{
        ship.isSink = ship.sections.every((section)=>section.isHit)
    })
}

// SHOOT COMPUTER

let computerShotsHistory=[]
export function computerShootAtShips(){
  let computerShot = Math.floor(Math.random()*100)
  localStorage.setItem('computerShot', computerShot);
  if( checkComputerShotOnRepeat(computerShot) ){
    addComputerShotToHistory(computerShot)
  } else return computerShootAtShips()   
  checkComputerByHit(computerShot)
  checkHumanShipsBySink()
  }

function checkComputerShotOnRepeat(computerShot){
    return computerShotsHistory.every((item)=> item !== computerShot)
}

function addComputerShotToHistory(computerShot){
  computerShotsHistory.push(computerShot)
}

function checkComputerByHit(computerShot){
  humanShips.forEach((ship)=>ship.sections.forEach((section)=>{
    if (computerShot == section.position){
      section.isHit = true 
      localStorage.setItem('sectionIsHit',section.position)
    }
  }))
}

function checkHumanShipsBySink(){
  humanShips.forEach((ship)=>{
      ship.isSink = ship.sections.every((section)=>section.isHit)
  })
}

export function checkWhoWin(ships, player){
  let isGameOver =ships.every((ship)=>ship.isSink)
  if (isGameOver){ 
    console.log(`${player.toUpperCase()} ARE WIN!`);
    return true
  } else return false
}

export function fireSecondShot (event){
  let humanShot = getNumberPosition(event.target.id)
  return computerShips.some((ship)=>ship.sections.some((section)=>section.position == humanShot))
}

export function fireSecondShotComuter (){
  let computerShot = localStorage.getItem('computerShot')
  return humanShips.some((ship)=>ship.sections.some((section)=>section.position == computerShot))
}
