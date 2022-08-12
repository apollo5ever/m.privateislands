import React from 'react'
import ReactDOM from 'react-dom'
import { LoginContext } from '../LoginContext';



export default function Login(){

  const [state, setState] = React.useContext(LoginContext);

  const Logout = async ()=>{
    const response = await fetch('/api/logout');
    setState(state=>({...state,token:null}))
    setState(state=>({...state,loggedIn:false}))
    setState(state=>({...state,userAddress:null}))
    console.log("logout",state.token)
    console.log("logout",state.loggedIn)
  }


 const handleSubmit = async e => {
  e.preventDefault();
  if(!state.userAddress) return
  
  
  var credentials = {address:`${e.target.address.value}`, pass:`${e.target.pass.value}`}
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials ),
  });

  const token = await response.json()
  setState(state=>({...state,token:token.accessToken}))
  setState(state => ({ ...state, loggedIn: true }))
  console.log(state.token)
  console.log(state.loggedIn)

};

    return(
        <div className="login">
        
        
        
        {state.loggedIn?
        <button onClick={()=>Logout()}>logout</button>
      :
    
    <form onSubmit={handleSubmit}>
      <input placeholder="Dero Address" id="address" type="text"/>
      <input placeholder="password" id="pass" type="password"/>
      <button type={"submit"}>Login</button>
    </form>
}
    
    

        </div>
    )
}