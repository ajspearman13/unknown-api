import axios from 'axios';
import React, { useState , useEffect, useRef, useContext} from 'react';
import './App.css';
import './pokedex.css';
import { Battle } from "./Context";
import AOS from "aos";
import "aos/dist/aos.css";

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
 const links = props.urls.map(x => <Pokemon link={x} key={x}  />)
 useEffect(() => {
  AOS.init();
    AOS.refresh();
 }, [])
 
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
 const [pic, setPic] = useState('')
 const [baseEx, setBaseEx] = useState('')
 const [stats, setStats] = useState('')
 const [color, setColor] =useState('')
 const [id, setId] = useState('')
 const [battleStats, setBattleStats] = useState('')
 const [hp, setHp] = useState('')
 const [attack, setAttack] = useState('')
 const [backPic, setBackPic] = useState('')
  useEffect(()=> { 
  axios.get(props.link) 
        .then(res =>{
         setName(res.data.name.toLocaleUpperCase())
         setType(res.data.types.map(x => x.type.name.toLocaleUpperCase() +" " )) // check this out
          //setMoves(res.data.moves.map(x => x.move.name).sort().map(x => <li>{x}</li>)    )
         setPic(res.data.sprites['front_default'])
         setBaseEx(res.data['base_experience'])
         setColor(getColor(res.data.types[0].type.name) )
         setId(res.data.id)
         setBattleStats(res.data.stats)
         setHp(res.data.stats[0]['base_stat'])
         setAttack(res.data.stats[1]['base_stat'])
         setBackPic(res.data.sprites['back_default'])
         setStats(res.data.stats.map(x => {
         return <li > <span>{x.stat.name.toUpperCase() }</span> 
                     <span>{x["base_stat"]}  </span>
                </li> 
         }))
        })
        .catch((err) => {console.error(err)})  
  }, [props.link]) 
  return(
    <div  >
      <Display   name={name} type={type} baseEx={baseEx} stats={stats} pic={pic} 
                   color={color} id={id}  
                   data={[name, type, baseEx, stats, pic, color, id, battleStats,  props.link, hp, attack, backPic]}
      />
    </div>
  )
}
function Display(props){ 
  //const style = [ "colours", ".", props.type[0] ].join("")
  const background = props.color
  const dropInfo = useRef()
  const dropdown = useRef()
  const btnBox = useRef()
  const [show, setShow] = useState('drop-info')
  const checkbox = useRef()
  const [btnText, setBtnText] = useState('select')
  const [btnColor, setBtnColor] = useState('white')
  const {value, setValue, removeBtnChange, setRemoveBtnChange} = useContext(Battle)
  function toggle(){
    return (show === 'drop-info') ? setShow('show')
    : setShow('drop-info')  
  }
  function captured(){
    if (btnText === 'select'){
      if   (value.length === 6){  alert('SORRY!!! YOU CAN ONLY SELECT 6 POKEMON')}
      else {setBtnText('drop')
           setValue([...value, props.data])
           setBtnColor(props.color)               ////// change  
          setRemoveBtnChange([66 +props.id])
          
          }    
     } 
     else{ setBtnText('select') 
     setBtnColor('white')
         setValue  ( value.filter(x => x[0] !== props.data[0]))
         setRemoveBtnChange([props.id])
        }
     console.log(removeBtnChange)
  }
  function remove(x){
      if  (value.map(x=>x[0]).includes(props.data[0]))  { return ( setBtnText('drop'), setBtnColor(props.color)) }  
 
    }
 useEffect(() => {
  remove()
 //console.log('')
 }, [remove, removeBtnChange ])
  return(
    <div style={{backgroundColor: background }}  className="poke-box" key={props.name} 
    data-aos="zoom-in-up" data-aos-delay="100" data-aos-offset="200"  >
      <div >
        <p className='poke-id'> No. {props.id} </p> 
        <div ref={btnBox} className='btn-box'>

        <button onClick={captured}  ref={checkbox} className='select-btn' style={{backgroundColor: btnColor}} disabled={false} >{btnText}</button>
        <br/>
        </div>
        <div className="poke-pic">
          <img src={props.pic} className="pic" data-aos="flip-down" data-aos-delay="200" alt={props.name} />
        </div>
        <p className='poke-name'>{props.name}</p>
        <p className='poke-type'>  {props.type}</p>
        <button className="drop-button" onClick={toggle} >STATS</button>
      </div>     
      <div className="dropdown"  ref={dropdown}>
        <div ref={dropInfo} className={show}   >
          <ul>
            <li key={Math.random() +  props.name} > EXP <span>{props.baseEx} </span></li>
            {props.stats}
          </ul>
        </div>
      </div>
    </div>
  )
}



export  default Pokedex;
