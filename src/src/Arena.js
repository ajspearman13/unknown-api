import axios from 'axios';
import React, { useState , useEffect, useRef, useContext} from 'react';
import './App.css';
import './pokedex.css';
import { Battle } from "./Context";

const blueStyle = {
  backgroundImage: '-webkit-linear-gradient(50deg, white 50%, #3571bb 50%)',
  color: 'white'
}
const whitestyle = {
 
  
   color: 'white',
   backgroundImage: '-webkit-linear-gradient(50deg, #3571bb 50%, white 50%)'
}
const transparent= {color: 'transparent'}

function Arena(){
  
  const {value, setValue, selectDisplay, bottomPoke, attackBtn , disable, setDisable, 
    hpArr , setHpArr,  arenaBtn, logo, player1Hp, player2Hp, setPlayer1Hp, setPlayer2Hp , roll, setRoll } = useContext(Battle)
  
  const [battlePoke, setBattlePoke] = useState([])
  const [animation, setAnimation]= useState(blueStyle)
  
  


  function queDisplay(x){
   
    function enterArena(){
      ( battlePoke.includes(x))? alert(x[0] + " is already in the battle") :
        (battlePoke.length >= 2)? alert("Only two")
        : setBattlePoke([...battlePoke, x])
          setHpArr([...hpArr, x[9] ])
    }
    
    return <div style={{background:x[5]}} ref={arenaPoke} className='arenaPoke' onClick={enterArena}  >    
        <br/><img src={x[4]}  ref={arenaPic}  className='arena-pic'   alt={x[0]}/>
     </div>  
  }
  const [turn, setTurn] = useState('')
  const [startGame, setStartGame] = useState('New Game')
  
  
  
  function testing(){
 setBattlePoke([])
 setDisable(false)
 setTurn('')
 setStartGame('New Game')
 setHpArr([])
 setAnimation(transparent)
 setRoll('')
 setGameOver(' ')
   //console.log(player1Hp)
  //console.log(turn)
 // console.log (battlePoke[0][0])
  }
    
   

  useEffect(() => {
        setPlayer1Hp(hpArr[0])
        setPlayer2Hp(hpArr[1])
        setDisable(false)
      // if(player1Hp <=-.9999) setStartGame('EEEEEEEEE')
      //console.log(player1Hp)
  }, [hpArr])
   
  useEffect(() => {
   
        setTimeout(() => {
        if (player1Hp < 0) {setStartGame(('Game Over...' + ' ' + battlePoke[1][0] + " Wins !!!").toUpperCase())
       // setTimeout(() => {  setRoll('roll-out-bottom') }, 100)        
        setPlayer1Hp( 'Frito')
                setDisable(true)
                setGameOver('gameOver')
                
              //  attackBtn.current.style.visibility='hidden'
            }
        if (player2Hp < 0) {setStartGame(('Game Over...' + ' ' + battlePoke[0][0] + " Wins !!!").toUpperCase()  )
       // setTimeout(() => {  setRoll('roll-out-bottom') }, 100)  
        setPlayer2Hp( 'Frito')
               setDisable(true)
               setGameOver('gameOver')
             //   attackBtn.current.style.visibility='hidden'
            }
               
        }, 30);
     
        
      
  }, [player1Hp, player2Hp])
  useEffect(() => {
   (animation === whitestyle)? setAnimation(blueStyle) : setAnimation(whitestyle)
    
  }, [turn])
  
    
    
    

  const players =   battlePoke.map(x=> <Player data={x} battlePoke={battlePoke} hpArr={hpArr} setHpArr={setHpArr} setBattlePoke={setBattlePoke} index={battlePoke.indexOf(x)}
        player1Hp={player1Hp} setPlayer1Hp={setPlayer1Hp} setTurn={setTurn} turn={turn} startGame={startGame}  setStartGame={setStartGame}    player2Hp={player2Hp} setPlayer2Hp={setPlayer2Hp}                           
  />)
    const battleBox = useRef()
    const arenaHeader = useRef()
    const arenaPoke = useRef()
    const arenaPic = useRef()
    const queBox = useRef()
    // ref={battleBox} id='battle-box' 
    const player1Box = useRef()
    const player2Box = useRef()
    const topBox = useRef()
    const leftBox = useRef()
    const newGameBox = useRef()
    const playerTurn = useRef()

    const gameOverBox = useRef()
    const [gameOver, setGameOver] = useState('')
    const clearBtn = useRef()
    const clearBtnBox = useRef()

    




  return (
    <div className='Arena'>

      
      <div  ref={arenaHeader} id='arena-header'   >
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png' alt='logo' id='logo'  ref={logo}  />
      
      </div>
      <div   ref={clearBtnBox} id='resetBtnBox'>  
      <button onClick={testing}   ref={clearBtn} id='reset-btn' > RESET GAME</button> 
      </div>
      <div   >
        <div ref={queBox} id='queBox'  data-aos="fade-right" data-aos-duration="1000"  >
            {value.map( queDisplay)}
        </div>
        
        
        <div ref={topBox} style={animation}  id='topBox' >    
          <div  ref={leftBox}  id='leftBox' >  <p> Player {turn} </p>   </div>
        <div  ref={newGameBox} id='newGameBox' > <div ref={gameOverBox} id={gameOver}  >  {startGame}  </div> </div> 
          <div  ref={playerTurn}   id='playerTurn' > <p> Player {turn} </p> </div>
        </div>
          
          
        
            <div ref={battleBox} id='battle-box'  > 
            
              <div ref={player1Box}  id='player1Box'>
               <p> Player 1</p>  {players[0]} 
              </div>

              <div  ref={player2Box}  id='player2Box'  >
              <p> Player 2</p> {players[1]} 
              </div>

            </div>
        </div> 
        <hr/>
       
     

    </div>
  )
  
}
function Player (props){
    const {attackBtn, player2Hp, player1Hp, bottomPoke, setBattlePoke, 
      hpArr , setHpArr, battlePoke, setPlayer1Hp,  arenaBtn, setPlayer2Hp, disable , roll, setRoll} = useContext(Battle)
   //const [hp, setHp] =useState([props.data[7][0]['base_stat'], props.index])
  


    function exitArena(){ 
       // setBattlePoke( battlePoke.filter(y=> ! y))
        //  console.log(props.battlePoke.filter(p => p !== props.data))
       // console.log(props.battlePoke)
       // console.log(props.index)
        props.setBattlePoke(props.battlePoke.filter(p => p !== props.data)) 
        props.setHpArr(props.hpArr.filter(p => p !== props.data[9])) 
      // props.exit(props.battlePoke.filter(p => p !== props.data))
      }
   useEffect(() => {
     props.setTurn(1)
     
   }, [props.battlePoke])
   
   const [attackAnimation, setAttackAnimation] = useState('')

    function attack(){

     if (props.index +1 !== props.turn) alert('Not your turn') 
     else{
      
       return (props.index  === 0)? (props.setPlayer2Hp( Math.floor(props.player2Hp - props.data[10] / 2) ) , props.setTurn( 2 ) , props.setStartGame('Game On') ,
       setAttackAnimation('a0')  ) 
       : (props.setPlayer1Hp( Math.floor(props.player1Hp - props.data[10] / 2 )), props.setTurn( 1 )  ,  props.setStartGame('Game On'),
       setAttackAnimation('a1')  )
     }

    
   
    }
    useEffect(() => {
      setTimeout(() => {
        setAttackAnimation(' ')
       }, 5000);
      
    }, [attackAnimation])

    

    const battlePokeBox = useRef()
    const battlePick = useRef()
    const battleInfo = useRef()
    const hpBar = useRef()
    
    const thisHp = (props.index === 0 )? player1Hp : player2Hp
    const hpBarStyle={ backgroundImage: '-webkit-linear-gradient(50deg, #3571bb {}%, white 50%)'}
    const health =  (thisHp > 1 )?  [Math.floor(thisHp/ props.data[9] * 100) ].toString() + '%' : '0%'
    const image = (props.index === 1)? props.data[11] : props.data[4]
    const death = (thisHp === 'Frito' )? 'p'+props.index : ''

    
     
   

    return(
      <div  >
  
        <div  onDoubleClick={exitArena} ref={battlePokeBox }  id={death} className='battlePokeBox'   >  
          <br/> 
          <div  ref={battlePick} className='battlePic' > <img src={image}    className='battlePic' className={attackAnimation}   alt={props.data[0]}/></div>  
        </div> 
        <div  ref={battleInfo } className='battleInfo'   >   

          <p>  {props.data[0]}   <br/>
           HP: {thisHp} / {props.data[9]}  </p>
          <div style={{width: "80px", border: "1px solid black", marginTop: '-5px'}}> 
            <div ref={hpBar} style={{width: health}} className='hp-Bar'  >
              health
            </div>
          </div>
        <div className='attackBtn' ref={attackBtn}  >  <button onClick={attack}  ref={arenaBtn} className='arenaBtn' disabled={disable} > Attack</button> </div>
        </div>
        
      </div> 
    )
}
  
  export default Arena