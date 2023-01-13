import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostDetail() {
  const [newpost, setNewpost] = useState([]);
  const [olddata, setOlddata] = useState([]);
  const [state, setState] = useState({
    message: "",
    status: true,
  });
  const [commit, setCommit] = useState([]);
  const { slug, id } = useParams();

  function getuserdetail() {
    axios
      .get("http://localhost:8001/get-user ", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.data.length > 0) {
          setOlddata(res.data.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  function postdata() {
    console.log();
    axios(`http://localhost:8001/getpostdata/${slug}`)
      .then((res) => setNewpost(res.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    postdata();
    getuserdetail();
    getcomment();
  }, []);

  function getcomment() {
    axios
      .get(`http://localhost:8001/usercomment/${id}`)
      .then((res) => setCommit(res.data))
      .catch((err) => console.log(err));
  }

  const handelSubmit = (e) => {
    e.preventDefault();

    const alldata = {
      message: state.message,
      userid: olddata[0].id,
      postid: newpost[0].id,
      status: state.status,
    };
    axios
      .post("http://localhost:8001/commentpost", alldata)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    if (state.message.length > 0) {
      getcomment();
    }
  };

  return (
    <div>
      <div className="container">
        {newpost?.map((item) => {
          return (
            <div key={item.id}>
              <div className="card">
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
            </div>
          );
        })}
        <div>
          <form onSubmit={(e) => handelSubmit(e)}>
            <input
              type="text"
              value={state.message}
              onChange={(e) => setState({ ...state, message: e.target.value })}
            />
            <button type="submit" className="btn btn-secondary">
              Submit
            </button>
          </form>
          <br />
          <div style={{ width: "200px", height: "200px", overflow: "auto" }}>
            {commit.map((el) => {
              return (
                <div key={el.userid}>
                  <br />
                  User: <div className="message1">{el.username}</div>
                  <div>
                    <div className="message">Message:{el.message}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;  
