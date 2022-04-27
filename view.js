import { getIdPosition, } from "./src/modules.js"
import {humanShips} from './src/humanShips.js'
import {computerShips} from './src/computerShips.js'

export function createBattleField ( player ){
  const table = document.createElement('table')
  document.body.appendChild(table)
  table.classList.add(`table-${player}`)

  const th = document.createElement('th')
  table.appendChild(th)
  th.innerHTML = ' '

  for (let i=1; i<=10; i++){
    const th = document.createElement('th')
    table.appendChild(th)
    th.innerHTML = `${String.fromCharCode(64 + i) }`
  }

  for (let i=0; i<10; i++){
    const tr =document.createElement('tr')
    table.appendChild(tr)

    const th = document.createElement('th')
    tr.appendChild(th)
    th.innerHTML = `${i}`

    for(let y=1; y<=10; y++){
      const td =document.createElement('td')
      tr.appendChild(td)
      let forId= String.fromCharCode(64 + y)
      td.setAttribute('id',`${forId}${i}-${player}`)
    }
  }
  let caption = document.createElement('caption')
  table.appendChild(caption)
  caption.innerHTML=` ${player}`
  caption.style.fontSize='30px'
}

export function showHumanShips (){
  humanShips.forEach((ship)=>ship.sections.forEach((section)=>{
    if ( section.position !== undefined){
      let id= getIdPosition(section.position)
      document.getElementById(`${id}-human`).classList.add('auto-ship')
    }
  }))
}

export function showComputerField(event){
  document.getElementById( `${event.target.id}` ).classList.add('miss')
  computerShips.forEach((ship)=>{
    ship.sections.forEach((section)=>{
      if (section.isHit){
        let id= `${getIdPosition(section.position)}-comp`
        document.getElementById( `${id}` ).classList.add('hit')
        document.getElementById( `${id}` ).classList.remove('miss')
      }
    })
  })
}

export function showHumanField(){
  let computerShot = localStorage.getItem('computerShot')
  let computerShotId = `${getIdPosition(computerShot)}-human`
  document.getElementById( `${computerShotId}` ).classList.add('miss')
  humanShips.forEach((ship)=>{
    ship.sections.forEach((section)=>{
      if (section.isHit){
        let id= `${getIdPosition(section.position)}-human`
        document.getElementById( `${id}` ).classList.add('hit')
        document.getElementById( `${id}` ).classList.remove('miss')
      }
    })
  })
}
