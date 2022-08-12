import React from 'react'
import sha256 from 'crypto-js/sha256'
import to from 'await-to-js'

import { LoginContext } from '../LoginContext';

export default function Comments(props) {
    
    const [state, setState] = React.useContext(LoginContext);
    const comments = props.comments && props.comments.map(x=><div className="function"><b>Author: {x.author}</b><p>{x.content}</p></div>)
    //map comments to jsx
    const comment = async e => {
        e.preventDefault()
        
       const token=await Refresh()
        const post = {
            author:state.userAddress,
            content:e.target.comment.value,
            replies:[]
        }
       
        const response = await fetch(`/api/postComment/${props.island}/${props.tier}/${props.post}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify(post),
        });
        
        console.log(response)
    
    };

    const Refresh= async ()=>{
        const response = await fetch('/api/refresh');
        const token = await response.json()
        console.log("refresh says token is",token.accessToken)
        setState(state=>({...state,token:token.accessToken}))
        setState(state=>({...state,loggedIn:true}))
        return(token.accessToken)
      }



    return(
        <div className="function">
            <h3>Comments</h3>
            {comments}
            <form onSubmit={comment}>
                <input placeholder="Comment..." id="comment" type="text"/>
                <button type={"submit"}>Comment</button>
            </form>
           
        </div>
    )
}