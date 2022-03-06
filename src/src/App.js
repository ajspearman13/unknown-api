import React, { useState , useEffect, useRef } from 'react';
import Pokedex  from './Pokedex';
import axios from 'axios';
import arrow from './arrow-pic.png';
import {Battle} from './Context.js';
<link href="http://fonts.cdnfonts.com/css/pokemon-solid" rel="stylesheet"></link>

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
  const logo= useRef()
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
    setPage('https://pokeapi.co/api/v2/pokemon/?offset=1118&limit=8')
    setPageNum(57)
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
      ).then((pageNum === 57) ? lastBtn.current.style.visibility='hidden'
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
  useEffect(()=> { 
   (value.length < 1 ) ? bottom.current.style.background="transparent"  
  : bottom.current.style.background="linear-gradient(333deg, rgba(189,185,185,1) 0%, rgba(254,253,253,1) 100%, rgba(186,182,182,1) 100%)"
   }, [value ]) 
  //const selectName = value.map(x=> x[0] + " ")
  //const selectPic = value.map(x=> x[4])
  //const selectColor = value.map(x=> x[5])  56
  //const selectType = value.map(x=> x[1][0])
  //const selectHp = value.map(x=> x[7][0]['base_stat'])
  //const selectAttack = value.map(x=> x[7][1]['base_stat'])
  //const selectSpeed = value.map(x=> x[7][5]['base_stat'])
  //const selectDefense = value.map(x=> x[7][2]['base_stat'])
  function selectDisplay(x){
   return <div style={{background:x[5]}} ref={bottomPoke} className='bottomPoke'  >    
       <br/><img src={x[4]}    className='bottom-pic'   alt={x[0]}/>
    </div>  
  }
  return (
    <div className="App">
      <div className='header'>
      <div >  <button  className='pg-btn' id='first-btn' ref={firstBtn} onClick={firstPage} > first </button></div>
        <div >  <button  className='pg-btn' id='prev-btn' ref={prevBtn} onClick={previousPage} > prev </button></div>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png' alt='logo' id='logo'  ref={logo}  />
        <div > <button className='pg-btn' id='next-btn' ref={nextBtn} onClick={nextPage} > next </button> </div>
        <div > <button className='pg-btn' id='last-btn' ref={lastBtn} onClick={lastPage} > last </button> </div>  
        <div id="page-num">
          <p>Page {pageNum} / 57 </p>
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