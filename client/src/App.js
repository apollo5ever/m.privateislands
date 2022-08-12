import React from 'react'
import './App.css';
import {Outlet,NavLink,Link} from 'react-router-dom'
import Login from './components/login'
import { LoginContext } from './LoginContext';



import to from 'await-to-js'



function App() {
  
  const [state, setState] = React.useContext(LoginContext);
  
  

  


  const Refresh= async ()=>{
    const response = await fetch('/api/refresh');
    const token = await response.json()
    console.log("refresh says token is",token.accessToken)
    setState(state=>({...state,token:token.accessToken}))
    setState(state=>({...state,loggedIn:true}))
  }





  return (
    
    <div className="App">
      
     <div className="logo"><Link to="/" style={{ textDecoration: 'none' }}><h1>Private Islands</h1></Link></div>
     <Login />
     <GetCocos/>
     <div className="navbar">
    <NavLink to ="feed">Feed</NavLink>
     <NavLink to="about">About</NavLink>
     
     
     </div>
 
   


     <Outlet />
    </div>
    
  );
}

export default App;
