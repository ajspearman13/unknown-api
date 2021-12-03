
import './App.css';

import React, { useState , useEffect} from 'react';
import Pokedex  from './Pokedex';

import axios from 'axios';
const initialSite = "https://pokeapi.co/api/v2/pokemon/?limit=5"



function App() {
  const [siteArr, setSiteArr] = useState([])
  const [jsonArr, setJsonArr] = useState([])
  const [page, setPage] = useState(initialSite)
  const [nameArr, setNameArr] = useState([])
  
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
            setNameArr(response.data.results.map(x =>  x.name) )
            setSiteArr(response.data.results.map(x =>  x.url) )
            setJsonArr(siteArr.map(http => axios.get(http)
                              .then(res => res.data) 
                              
                              .catch((err)=> console.error(err))
            )  
            ) 
                              
              }) 
            .catch((err) => {
              console.error(err)
            })   
     }, [page])        
  
  
  //console.log(jsonArr)

  return (
                                  //Each poke site is an array with each url
    <div className="App">
      <h1>Pokedex</h1>
      <button onClick={previousPage} > prev </button>
        <button onClick={nextPage} > next </button>
            <hr/>
        <button onClick={()=> setJsonArr([9])} > help</button>
        <Pokedex names={nameArr} json={jsonArr} /> 
        
        
         
        
    </div>

  );
}



export default App;