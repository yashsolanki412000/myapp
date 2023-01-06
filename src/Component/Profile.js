import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Profile() {
  const [userData, setUserData] = useState([]);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState("");
  
  const  navigate = useNavigate("")
  const getdata = (item) => {
    setAddress(item[0].address)
    setCity(item[0].city)
  };

  useEffect(() => {
    getuserdetail();
  }, []);
  function getuserdetail() {
    axios
      .get("http://localhost:8001/get-user ", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.data.length > 0) {
          setUserData(res.data.data);
          setId(res.data.data[0].id);
          getdata(res.data.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  function formSubmitData(e) {
    const item = { address, city };
    console.log(item);
    e.preventDefault();
    axios
      .put(`http://localhost:8001/updateuser/${id}`, item)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
     
  }

  return (
    <div>
      {userData.map((item) => {
        return <div key={item.id}>{item.email}</div>;
      })}

      <form onSubmit={(e) => formSubmitData(e)}>
      <label className="form-label">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
              />
               <label className="form-label">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-control"
              />
       <button
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
      </form>
    </div>
  );
}

export default Profile;
