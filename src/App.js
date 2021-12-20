
import React, { useState , useEffect, useRef } from 'react';
import Pokedex  from './Pokedex';
import axios from 'axios';
const arrow = './arrow-pic.jpeg'
function App() {
  const [siteArr, setSiteArr] = useState([])
  const [page, setPage] = useState("https://pokeapi.co/api/v2/pokemon/?limit=20")
  const [nameArr, setNameArr] = useState([])
  const prevBtn = useRef()
  const nextBtn = useRef()
  function nextPage(){
    axios.get(page).then(res =>{
      setPage(res.data.next) 
    }) 
    window.scrollTo(0,0)
  }
  function previousPage(){
    axios.get(page).then(res =>{
      setPage(res.data.previous) 
    }) 
    window.scrollTo(0,0)
  }  
  function scrollTop(){
    window.scrollTo(0,0)
  }
  useEffect(()=> { 
    axios.get(page).then(response=> {
          (response.data.previous === null)? prevBtn.current.style.visibility='hidden' 
          : prevBtn.current.style.visibility='visible' ;
          (response.data.next === null)? nextBtn.current.style.visibility='hidden' 
          :nextBtn.current.style.visibility='visible' 
    })
  }, [page ])
  useEffect(()=> { 
      axios.get(page) 
            .then(response => {
              setNameArr(response.data.results.map(x =>  x.name) )
              setSiteArr(response.data.results.map(x =>  x.url) )             
             })
      .catch((err) => {console.error(err) })     
  }, [page ])   
  return (
    <div className="App">
      <div className='header'>
        <div >  <button  className='pg-btn' id='prev-btn' ref={prevBtn} onClick={previousPage} > prev </button></div>
        <h1>Pokedex</h1>
        <div > <button className='pg-btn' id='next-btn' ref={nextBtn} onClick={nextPage} > next </button> </div>
      </div>
        <Pokedex names={nameArr} urls={siteArr} /> 
        <button onClick={scrollTop} id='top-btn' > 
            <img id='arrow' src={arrow} alt='up-arrow'/>
        </button>
    </div>
  );
}
export default App;