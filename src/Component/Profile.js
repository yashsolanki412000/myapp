import React, { useEffect, useState } from "react";
import axios from "axios";
function Profile() {
  const [userData, setUserData] = useState([]);
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState("");

  const getdata = (item) => {
    setAddress(item[0].address);
    setCity(item[0].city);
    setImage(item[0].images);
  };
  const uploadimage = (e) => {
    if (e.target.files.length > 0) {
      const images = new FileReader();
      images.onload = (event) => {
          setImage(event.target.result);
      };
       images.readAsDataURL(e.target.files[0]);
     console.log(images)
    }
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
        console.log(res,"responce")
        if (res.data.data.length > 0) {
          // console.log("resss", res.data.message);
          setUserData(res.data.data);
          setId(res.data.data[0].id);
          setEmail(res.data.data[0].email);
          getdata(res.data.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  function formSubmitData(e) {
    e.preventDefault();
    const item = { address, city, image };
    axios
      .put(`http://localhost:8001/updateuser/${id}`, item)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      {userData.map((item) => {
        return (
          <div key={item.id}>
            <h4>User:</h4>
            <span>{item.email}</span>
          </div>
        );
      })}

      <form >
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
        /><br/>
        <input type="file" onChange={(e) => uploadimage(e)} />
      </form>
      <div className="image">{ <img src={image} />}</div><br/>
      <button onClick={(e) => formSubmitData(e)} type="submit" className="btn btn-primary">
        Submit
      </button>
    </div>
  );
}

export default Profile;
