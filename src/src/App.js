
import React, { useState , useEffect, useRef } from 'react';
import Pokedex  from './Pokedex';
import axios from 'axios';
import arrow from './arrow-pic.png';
import {Battle} from './Context.js';



function App() {
  const [siteArr, setSiteArr] = useState([])
  const [page, setPage] = useState("https://pokeapi.co/api/v2/pokemon/?limit=20")
  const [nameArr, setNameArr] = useState([])
  const [pageNum,setPageNum] = useState(1)
  const prevBtn = useRef()
  const nextBtn = useRef()
  const lastBtn = useRef()
  const firstBtn = useRef()
  const bottom = useRef()
  const bottomPoke= useRef()
  //const pokeBox= useRef()

  const [value, setValue] = useState([])
  
  


  function nextPage(){
    axios.get(page).then(res =>{
      setPage(res.data.next) 
    }) 
    setPageNum(pageNum + 1)
    window.scrollTo(0,0)
  }
  function previousPage(){
    axios.get(page).then(res =>{
      setPage(res.data.previous) 
    }) 
    setPageNum(pageNum - 1)
    window.scrollTo(0,0)
  }  
  function lastPage(){
    setPage('https://pokeapi.co/api/v2/pokemon/?offset=1100&limit=18')
    setPageNum(56)
    window.scrollTo(0,0)
  }
  function firstPage(){
    setPage("https://pokeapi.co/api/v2/pokemon/?limit=20")
    setPageNum(1)
  }
  
  function scrollTop(){
    window.scrollTo(0,0)
  }
  
  useEffect(()=> { 
    
    axios.get(page).then(response=> {
          (response.data.previous === null)? prevBtn.current.style.visibility='hidden' 
          : prevBtn.current.style.visibility='visible' ;
          (response.data.next === null)? nextBtn.current.style.visibility='hidden' 
          :nextBtn.current.style.visibility='visible' ;
    }).then((pageNum === 1 ) ? firstBtn.current.style.visibility='hidden'
            :firstBtn.current.style.visibility='visible'
      ).then((pageNum === 56) ? lastBtn.current.style.visibility='hidden'
      :lastBtn.current.style.visibility='visible')

  }, [pageNum , page ])

  useEffect(()=> { 
    
    axios.get(page) 
            .then(response => {
              setNameArr(response.data.results.map(x =>  x.name) )
              setSiteArr(response.data.results.map(x =>  x.url) )             
             })
      .catch((err) => {console.error(err) })   
     

  }, [page ]) 
  useEffect(()=> { (value.length < 1 ) ? bottom.current.style.background="transparent" : 
  bottom.current.style.background="black"
    }, [value ]) 


  //const selectName = value.map(x=> x[0] + " ")
  //const selectPic = value.map(x=> x[4])
  //const selectColor = value.map(x=> x[5])
  
  //const selectType = value.map(x=> x[1][0])
  //const selectHp = value.map(x=> x[7][0]['base_stat'])
  //const selectAttack = value.map(x=> x[7][1]['base_stat'])
  //const selectSpeed = value.map(x=> x[7][5]['base_stat'])
  //const selectDefense = value.map(x=> x[7][2]['base_stat'])
 


  function selectDisplay(x){
   return <div style={{background:x[5]}} ref={bottomPoke} className='bottomPoke'  >
       <br/><img src={x[4]}    className='bottomImg'  alt={x[0]}/>
    </div>
    
  }
  
  return (
    <div className="App">
      <div className='header'>
      <div >  <button  className='pg-btn' id='first-btn' ref={firstBtn} onClick={firstPage} > first </button></div>
        <div >  <button  className='pg-btn' id='prev-btn' ref={prevBtn} onClick={previousPage} > prev </button></div>
        <h1>Pokedex</h1>
        <div > <button className='pg-btn' id='next-btn' ref={nextBtn} onClick={nextPage} > next </button> </div>
        <div > <button className='pg-btn' id='last-btn' ref={lastBtn} onClick={lastPage} > last </button> </div>  
        <div id="page-num">
          <p>Page {pageNum} / 56 </p>
        </div> 
        <button onClick={scrollTop} id='top-btn' > 
            <img id='arrow-pic' src={arrow}  alt='up-arrow'/>
        </button>      
      </div>
      
      <Battle.Provider value={{value, setValue , pageNum}} >
        <Pokedex names={nameArr} urls={siteArr}  /> 
      </Battle.Provider>
     <div ref={bottom} id='bottom'> 

        {value.map(selectDisplay)}

     </div>
         
    </div>
  );
}
export default App;