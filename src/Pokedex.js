import App from "./App"
import axios from 'axios';
import React, { useState , useEffect} from 'react';


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
      <div >
      {links}
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
 const [hp, setHp] = useState('')
 const [color, setColor] =useState('')

  useEffect(()=> { 
  axios.get(props.link) 
        .then(res =>{
         
         setName(res.data.name.toLocaleUpperCase())
         setMoves1(res.data.moves[  7 ].move.name)
         setMoves2(res.data.moves[  14 ].move.name)
         setMoves3(res.data.moves[  10 ].move.name)
         setMoves4(res.data.moves[  22 ].move.name)
         setType(res.data.types.map(x => x.type.name +" " )) // check this out
          //setMoves(res.data.moves.map(x => x.move.name).sort().map(x => <li>{x}</li>)    )
         setPic(res.data.sprites['front_default'])
         setBaseEx(res.data['base_experience'])
         setColor(res.data.types[0].type.name)
         setHp(res.data.stats.map(x => {
         return <li>{x.stat.name }  {x["base_stat"]}</li> 
         }))
        })
        .catch((err) => {
          console.error(err)
        })  
  }, [props.link]) 


  return(
    <div  key={name}>
      <Display   name={name} type={type} baseEx={baseEx} hp={hp} pic={pic}
                  moves={[moves1, moves2,moves3,moves4]} color={color}
      />
    </div>
    
  )

}
function Display(props){ 
  
  //const style = [ "colours", ".", props.type[0] ].join("")
  
  
  
  const background = getColor(props.color)
 

  return(
    <div style={{backgroundColor: background }} >
        <button onClick={()=>console.log(props.color)} > help </button>
   <img src={props.pic} />
     <p>{props.name}<br/>{props.type}<br/> EXP {props.baseEx} <br/> <br/></p>
    
     <ul>
       {props.hp}
     </ul>
    </div>
  )
}
  
  export  default Pokedex;
  