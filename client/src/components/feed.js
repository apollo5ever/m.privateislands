import React from 'react'
import { NavLink ,Link} from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import PostCard from './postcard';


export default function Feed(){

    const [posts,setPosts] = React.useState([])
    const [feed,setFeed] = React.useState("")
    const [state, setState] = React.useContext(LoginContext);

    const Refresh= async ()=>{
        const response = await fetch('/api/refresh');
        const token = await response.json()
        console.log("refresh says token is",token.accessToken)
        setState(state=>({...state,token:token.accessToken}))
        setState(state=>({...state,loggedIn:true}))
        return token.accessToken
      }

    const getFeed = async () => {
      if(!state.loggedIn)setPosts([])
      const token = await Refresh()
        const response = await fetch('/api/feed',{
          headers:{authorization: `Bearer ${token}`}});
        const body = await response.json();
    
        if (response.status !== 200) throw Error(body.message);
        setPosts(body)
       
        console.log("explore",JSON.stringify(body));
    }

    const formatFeed = () =>{
      let postArray=[]
      for(let t of posts){
	if(t!=null){
        for(let p of t){
          p.index=t.indexOf(p)
          postArray.push(p)
        }
	}
      }
      setFeed(postArray.map(p => 
     <Link to={`/island/${p.island}/${p.tier}/${p.index}`}> <PostCard title={p.title} brief={p.brief}/></Link>))
      
    }



    React.useEffect(() => {
         getFeed()
      }, [state.loggedIn])

    React.useEffect(()=>{
      formatFeed()
    },[posts])
 


      React.useEffect(()=>{
        console.log("refresh token")
        Refresh()
      },[])
     
    
      return(
         <div className="function">
          {feed!=""?feed:
          <h3>{state.loggedIn?"Nothing Here. Subscribe to some Islands.":"Log in to see your feed"}</h3>}
         </div>
      )

}
