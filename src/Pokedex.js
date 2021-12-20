import App from "./App"
import axios from 'axios';
import React, { useState , useEffect, useRef} from 'react';
import './App.css';

function getColor(x){

  return (x === "normal") ? '#A8A77A'
  :(x === "fire") ? '#EE8130'
  :(x === "water") ? '#6390F0' 
  :(x === "electric") ? '#F7D02C'
  :(x=== "grass") ? '#7AC74C'
  :(x === "ice") ? '#96D9D6'
  :(x === "fighting") ? '#C22E28'
  :(x === "poison") ? '#A33EA1'
  :(x === "ground") ? '#E2BF65'
  :(x === "flying") ? '#A98FF3'
  :(x === "psychic") ? '#F95587'
  :(x === "bug") ? '#A6B91A'
  :(x === "rock") ? '#B6A136'
  :(x === "ghost") ? '#735797'
  :(x === "dragon") ? '#6F35FC'
  :(x === "dark") ? '#705746'
  :(x === "steel") ? '#B7B7CE'
  :(x === "fairy") ? '#D685AD'
  :"white"

}
function Pokedex(props){
   
 const links = props.urls.map(x => <Pokemon link={x} key={x} />)

  return(
    <div id="list-wrapper"> 
      <div id="poke-list">
      {links}
      </div>
    </div>
  )
}
function Pokemon(props){
 const [name, setName] = useState('')
 const [type, setType] = useState('')
 const [moves1, setMoves1] = useState('')
 const [moves2, setMoves2] = useState('')
 const [moves3, setMoves3] = useState('')
 const [moves4, setMoves4] = useState('')
 const [pic, setPic] = useState('')
 const [baseEx, setBaseEx] = useState('')
 const [stats, setStats] = useState('')
 const [color, setColor] =useState('')
 const [id, setId] = useState('')

  useEffect(()=> { 
  axios.get(props.link) 
        .then(res =>{
         
         setName(res.data.name.toLocaleUpperCase())
         setMoves1(res.data.moves[  7 ].move.name)
         setMoves2(res.data.moves[  14 ].move.name)
         setMoves3(res.data.moves[  10 ].move.name)
         setMoves4(res.data.moves[  22 ].move.name)
         setType(res.data.types.map(x => x.type.name.toLocaleUpperCase() +" " )) // check this out
          //setMoves(res.data.moves.map(x => x.move.name).sort().map(x => <li>{x}</li>)    )
         setPic(res.data.sprites['front_default'])
         setBaseEx(res.data['base_experience'])
         setColor(getColor(res.data.types[0].type.name) )
         setId(res.data.id)

         setStats(res.data.stats.map(x => {
         return <li> <span>{x.stat.name.toUpperCase() }</span> 
                     <span>{x["base_stat"]}  </span>
                </li> 
         }))
        })
        .catch((err) => {
          console.error(err)
        })  
  }, [props.link]) 


  return(
    <div  key={name}>
      <Display   name={name} type={type} baseEx={baseEx} stats={stats} pic={pic}
                  moves={[moves1, moves2,moves3,moves4]} color={color} id={id}
      />
    </div>
    
  )

}
function Display(props){ 
  //const style = [ "colours", ".", props.type[0] ].join("")
  const background = props.color
  const dropInfo = useRef()
  const dropdown = useRef()
  const [show, setShow] = useState('drop-info')

 
  function toggle(){
    return (show === 'drop-info') ? setShow('show')
    : setShow('drop-info')  
  }

  return(
    <div style={{backgroundColor: background }} class="poke-box" >
      <div >
        <p class='poke-id'> No. {props.id}</p> 
        <div class="poke-pic">
          <img src={props.pic} class="pic"  alt={props.name} />
        </div>
        <p class='poke-name'>{props.name}</p>
        <p class='poke-type'>  {props.type}</p>
        <button class="drop-button" onClick={toggle} >Stats</button>
      </div>     
      <div class="dropdown"  ref={dropdown}>
        <div ref={dropInfo} class={show}   >
          <ul>
            <li style={{backgroundColor : background + ".02"}}> EXP <span>{props.baseEx} </span></li>
            {props.stats}
          </ul>
        </div>
      </div>
      
      

    </div>
  )
}
  
  export  default Pokedex;
  