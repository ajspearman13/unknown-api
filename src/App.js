
import React, { useState , useEffect} from 'react';
import Pokedex  from './Pokedex';

import axios from 'axios';




function App() {
  const [siteArr, setSiteArr] = useState([])
 
  const [page, setPage] = useState("https://pokeapi.co/api/v2/pokemon/?limit=5")
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
      <h1>Pokedex</h1>
      <button onClick={previousPage} > prev </button>
        <button onClick={nextPage} > next </button>
            <hr/>
          
        <Pokedex names={nameArr} urls={siteArr} /> 
        <button onClick={previousPage} > prev </button>
        <button onClick={nextPage} > next </button>
        
         
        
    </div>

  );
}



export default App;