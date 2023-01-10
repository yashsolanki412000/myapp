import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function PostDetail() {
    const [newpost,setNewpost] = useState([])
    const {slug} = useParams()
    console.log(slug)
    function postdata(){
        console.log()
        axios(`http://localhost:8001/getpostdata/${slug}`)
        .then((res)=>setNewpost(res.data))
        .catch((err)=>console.log(err))
    }
    useEffect(()=>{
        postdata()
    },[])
   
  return (
    <div>
        <div className="container">
        {newpost?.map((item)=>{
            return(
                <>
                <div className="card">
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

export default PostDetail
