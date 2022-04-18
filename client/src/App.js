import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Create from "./components/create";
import Notecard from "./components/notecard";
 
const App = () => {
 return (
   <div style={{display:'flex', flexDirection:'column', minHeight: '100vh' }}>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<RecordList />} />
       <Route path="/:owner/:title/notecard" element={<Notecard />} />
       <Route path="/create" element={<Create />} />
     </Routes>
   </div>
 );
};
 
export default App;