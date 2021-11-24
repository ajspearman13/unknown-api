import axios from 'axios';
import './App.css';
import React, { useState, useEffect } from 'react';
//<script src="https://npmcdn.com/axios/dist/axios.min.js"></script>

const site = 'https://pokeapi.co/api/v2/pokemon/?limit=151'

function Pokemon(props){

  return 
}

function App() {
  const [poke, setPoke] = useState('')
  const [type, setType] = useState("")
 
  const getSiteData = () =>{
    // Make a request for a user with a given ID
    axios.get(site) 
      .then(response => {
        // handle success
        //setPoke(response.data.name)
        setPoke(response.data.results[5].url )
        
      })      
  }
  
  function next() {
    axios.get(poke) 
      .then(response => {
        // handle success
        //setPoke(response.data.name)
        setType(response.data.name)
        
      })      
  }


  return (
    <div className="App">
      <h1>Pokedex</h1>
        <button onClick={getSiteData}> here </button>
        <button onClick={next}> next </button>
         
         <ul> {type}</ul>
         
        
    </div>

  );
}


export default App;
