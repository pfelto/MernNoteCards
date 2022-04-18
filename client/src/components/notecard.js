import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
// going to pull all of the notecards for the specific deck on load and use them. 
// If none then just show a blank card that cannot be clicked? 

const Card = (props) => (
      <div style={props.style} onClick={() => props.onClick()}>
      <p style={{alignSelf: 'center'}}>{!props.flipped ? props.record.header : props.record.body}</p>
      </div>)
  

  
const Notecard = () => {
    const [theNotecards, settheNotecards] = useState([]);
    const [position,setPosition] = useState(0);
    const [flipped, setFlipped] = useState(false);
    let {owner, title } = useParams();
    // This method fetches the records from the database.
    useEffect(() => {
      async function getRecords() {
        const response = await fetch(`http://localhost:5000/${owner}/${title}/notecard/`);
    
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const records = await response.json();
        settheNotecards(records);
      }
    
      getRecords();
    
      return;
    }, [theNotecards.length,owner,title]);

    function notecardClick(){
      setFlipped(!flipped);
    }

    let backDisabled = position === 0 ? true : false;
    let forwardDisabled = position === theNotecards.length - 1 ? true : false

    let content = theNotecards.length !== 0 ? 
    <Card 
      style={{
      display:'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      border: '1px solid black', 
      boxShadow: '5px 10px', 
      width: '70%',
      fontWeight: 'bolder',
      cursor: 'pointer',
      }} 
      flipped={flipped} 
      record={theNotecards[position]}
      onClick={() => notecardClick()}
    /> : null

  return (
    <div 
      style={{
      display: 'flex', 
      flex: '1 1 auto',
      flexDirection: 'column', 
      border: '1px solid red',
      padding: '10px 0 0'}}
      
    >
      <div style={{width: '100vw', flex:'3 1 auto', display: 'flex', justifyContent: 'center'}}>
        {content}
      </div>
      <div style={{width: '100vw',flex:'1 1 auto', display:'flex', alignItems: 'center', justifyContent: 'space-evenly'}} >
        <button disabled={backDisabled} 
        onClick={()=>
          {
            setPosition((position)=>position - 1);
            setFlipped(false);
          }
        }
          >Back</button>
        <button>Create New Card</button>
        <button disabled={forwardDisabled} 
        onClick={()=>{
          setPosition((position)=>position + 1);
          setFlipped(false);
        }}
        >Forward</button>
      </div>
    </div>

  )
}

export default Notecard