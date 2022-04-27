import { humanShips } from './humanShips.js'

export function getAllShipsSections(){
  const localShips = []
  humanShips.forEach((ship)=>{
    return ship.sections.forEach((section)=>localShips.push(section))
  }) 
  return localShips
}

export function getIdPosition(number){
  let localArray
  (number < 10)?(localArray = [ 0, number]) : (localArray = (""+number).split("").map(Number))
  let letter= String.fromCharCode(65+ localArray[0])
  return letter + localArray[1]
}

export function getNumberPosition (id){
  let result
  id.split('')
  let unicode = Number(id[0].charCodeAt(0)-65);
  unicode ==0 ? result=+id[1] : result=unicode*10 + (+id[1])
  return result   
  }
