import App from "./App"
import axios from 'axios';
import React, { useState , useEffect} from 'react';




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

  useEffect(()=> { 
  axios.get(props.link) 
        .then(res =>{
         
         setName(res.data.name.toLocaleUpperCase())
         setMoves1(res.data.moves[  7 ].move.name)
         setMoves2(res.data.moves[  14 ].move.name)
         setMoves3(res.data.moves[  10 ].move.name)
         setMoves4(res.data.moves[  22 ].move.name)
         setType(res.data.types.map(x => x.type.name +" " ))
          //setMoves(res.data.moves.map(x => x.move.name).sort().map(x => <li>{x}</li>)    )
         setPic(res.data.sprites['front_default'])
         setBaseEx(res.data['base_experience'])
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
      <img src={pic} alt={name}/>
     <p>{name}<br/>{type}<br/> EXP {baseEx} <br/> <br/></p>
     <p>{moves1}  {moves2} {moves3} {moves4}</p>
     <ul>
       {hp}
     </ul>


    </div>
    
  )
}
  
  export  default Pokedex;
  