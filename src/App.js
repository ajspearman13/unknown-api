
import React, { useState , useEffect} from 'react';
import Pokedex  from './Pokedex';

import axios from 'axios';




function App() {
  const [siteArr, setSiteArr] = useState([])
 
  const [page, setPage] = useState("https://pokeapi.co/api/v2/pokemon/?limit=20")
  const [nameArr, setNameArr] = useState([])
  
  
  
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

  
    // Make a request for a user with a given ID
    useEffect(()=> { 
      axios.get(page) 
            .then(response => {
              // handle success
              setNameArr(response.data.results.map(x =>  x.name) )
              setSiteArr(response.data.results.map(x =>  x.url) )                  
             }).catch((err) => {console.error(err) })  
            
            
     }, [page ])   
  
  //   console.log(siteArr)
  //console.log(jsonArr)

  return (
                                  //Each poke site is an array with each url
    <div className="App">
      <div class='header'>
        <div class='pg-btn' > <button onClick={previousPage} > prev </button></div>
        <h1>Pokedex</h1>
        <div class='pg-btn' > <button onClick={nextPage} > next </button> </div>
      </div>
          
        <Pokedex names={nameArr} urls={siteArr} /> 
        <button onClick={scrollTop} id='top-btn' > 
            <img id="arrow" src='data:image/jpeg;base64,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'alt='up-arrow'/>
        </button>
        
        
         
        
    </div>

  );
}



export default App;