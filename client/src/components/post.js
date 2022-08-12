import React from 'react'
import { useParams } from 'react-router-dom'
import { LoginContext } from '../LoginContext';
import {NavLink} from 'react-router-dom'
import Comments from './comments';



export default function Post(){
  window.scrollTo(0, 0)
  let params = useParams();
  var island = params.island
  var tier = params.tier
  var postindex = params.postindex
  const [post,setPost]=React.useState([])
  const [state, setState] = React.useContext(LoginContext);

    const callApi = async () => {
        console.log("calling api",state.token)
        const response = await fetch(`/api/island/${island}/${tier}/${postindex}`,{
            headers:{authorization: `Bearer ${state.token}`}
        });
        const body = await response.json();
    
        if (response.status !== 200) throw Error(body.message);
        setPost(body)
       
    }
    React.useEffect(() => {
        callApi()
        
      },[state])

      const Refresh= async ()=>{
        const response = await fetch('/api/refresh');
        const token = await response.json()
        console.log("refresh says token is",token.accessToken)
        setState(state=>({...state,token:token.accessToken}))
        setState(state=>({...state,loggedIn:true}))
      }
    
      
    
      React.useEffect(()=>{
        console.log("refresh token")
        Refresh()
      },[])


    return(<>
        <div className="function">

          
          
         <div className="post">
          <h1>{post.title}</h1>
          
          <p dangerouslySetInnerHTML={{__html: post.content}} />
            </div> 
            <Comments island={params.island} tier={params.tier} post={params.postindex} comments={post.comments}/>
            </div>
       
        </>
    )
}