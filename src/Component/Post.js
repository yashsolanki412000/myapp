import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Post() {
  const navigate = useNavigate();
  const [state, setState] = useState([]);
  useEffect(() => {
    getdata();
  }, []);
  function getdata() {
    axios
      .get("http://localhost:8001/newuserdata")
      .then((res) => setState(res.data))
      .catch((err) => console.log(err));
  }
  console.log(state)
  const postClick = (slug,id) => {
    console.log(id)
    navigate(`/postdetail/${slug}/${id}`);
  };

  // const postDelete = (slug) => {
  //   axios
  //     .delete(`http://localhost:8001/deletepost/${slug}`, {
  //       method: "DELETE",
  //     })
  //     .then((res) => { getdata()})
  //     .catch((err) => console.log(err));
 
  // };
   const postDelete = (id) => {
    axios
      .delete(`http://localhost:8001/deletecomment/${id}`, {
        method: "DELETE",
      })
      .then((res) => { getdata()})
      .catch((err) => console.log(err));
 
  };
  return (
    <div>
      
      <div className="container">
        {state?.map((item) => {
          return (
            <div key={item.id}>
              <div
                className="card"
                onClick={() => postClick(item.slug,item.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="card__header">
                  <img
                    src={item.image}
                    alt="card__image"
                    className="card__image"
                    width="600"
                  />
                </div>
                <div className="card__body">
                  <span className="tag tag-blue">Technology</span>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
                <div className="card__footer">
                  <div className="user">
                    <img
                      src={item.profileimage}
                      alt="user__image"
                      className="user__image"
                    />
                    <div className="user__info">
                      <h5>{item.username}</h5>
                      <small>{item.slug}</small>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                onClick={(id) => postDelete(item.id)}
                className="btn btn-primary"
              >
                DELETE
              </button>
            </div>
          );
        })}
  
  
</div>
      
    </div>
  );
}

export default Post;
