import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
// going to pull all of the notecards for the specific deck on load and use them. 
// If none then just show a blank card that cannot be clicked? 

const Card = (props) => (
    <tr>
        <td>{props.record.header}</td>
        <td>{props.record.body}</td>
        <td>{props.record.owner}</td>
        <td>{props.record.title}</td>
        <td>{props.position}</td>
    </tr>
   );

const Notecard = () => {
    const [theNotecards, settheNotecards] = useState([]);
    const [position,setPosition] = useState(0)
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


     // This method will map out the records on the table
 function notecardList() {
    return theNotecards.map((record,index) => {
      return (
        <Card
          record={record}
          position={index}
          key={record._id}
        />
      );
    });
  }

  return (
    <div>
    <h3>Notecard List</h3>
    <table className="table table-striped" style={{ marginTop: 20 }}>
      <thead>
        <tr>
          <th>Header</th>
          <th>Body</th>
          <th>Owner</th>
          <th>Title</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>{notecardList()}</tbody>
    </table>
  </div>

  )
}

export default Notecard