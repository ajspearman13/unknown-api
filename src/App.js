
import './App.css';

import React, { useState , useEffect} from 'react';
import Pokedex  from './Pokedex';

import axios from 'axios';
const initialSite = "https://pokeapi.co/api/v2/pokemon/?limit=5"



function App() {
  const [siteArr, setSiteArr] = useState([])
  const [nameArr, setNameArr] = useState("")
  const [page, setPage] = useState(initialSite)
  
  function nextPage(){
    
    axios.get(page).then(res =>{
      setPage(res.data.next)
    }) 
  }

  function previousPage(){
    axios.get(page).then(res =>{
      setPage(res.data.previous)
    }) 
}

   
  
    // Make a request for a user with a given ID
    useEffect(()=> { 
      axios.get(page) 
            .then(response => {
              // handle success
              //setPoke(response.data.name)
            setSiteArr(response.data.results.map(x =>  x.url) )
            setNameArr(response.data.results.map(x =>  x.name) )
              }) 
            .catch((err) => {
              console.error(err)
            })   
     }, [page])        
  
  

  return (
                                  //Each poke site is an array with each url
    <div className="App">
      <h1>Pokedex</h1>
      <button onClick={previousPage} > prev </button>
        <button onClick={nextPage} > next </button>
            
        
        
         <Pokedex arr={siteArr} name={nameArr} /> 
        
         
        
    </div>

  );
}



export default App;
