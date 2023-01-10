import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Post() {
    const navigate = useNavigate()
    const[state,setState] = useState([])
    useEffect(()=>{
     getdata()   
    },[])

    function getdata(){
        axios.get("http://localhost:8001/newuserdata")
        .then((res)=>setState(res.data))
        .catch((err)=>console.log(err))
    }
    const postClick = (slug)=>{
        navigate(`/postdetail/${slug}`)
    }
  return (
    <div>
     
        <div className="container">
        {state?.map((item)=>{
            return(
                <>
                <div className="card" onClick={(slug)=>postClick(item.slug)} >
    <div className="card__header">

      <img src={item.image} alt="card__image" className="card__image" width="600" />
    </div>
    <div className="card__body">
      <span className="tag tag-blue">Technology</span>
      <h4>{item.title}</h4>
      <p>{item.description}</p>
    </div>
    <div className="card__footer">
      <div className="user">
        <img src="https://i.pravatar.cc/40?img=1" alt="user__image" className="user__image"/>
        <div className="user__info">
          <h5>{item.username}</h5>
          <small>{item.slug}</small>
        </div>
      </div>
    </div>
  </div>
                
                </>
            )
        })}
  
  
</div>
      
    </div>
  )
}

export default Post
