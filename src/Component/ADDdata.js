import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
function ADDdata() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [state, setState] = useState([]);
  const [data, setData] = useState({
    name: "",
    email: "",
    age: "",
    address: "",
    Gender: "",
    image: "",
  });
  const handelChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const getdata = async () => {
    const res = await fetch("/getusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setState(data);
      console.log("get data");
    }
  };

  const handelClick = (e) => {
    e.preventDefault();

    if (
      data.name.length === 0 ||
      data.email.length === 0 ||
      data.age.length === 0 ||
      data.address.length === 0
    ) {
      setError(true);
    } else {
      Axios.post("http://localhost:8001/user", data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      navigate("/dashbord");
    }
  };
  return (
    <div>
      <button
        type="submit"
        onClick={() => navigate("/dashbord")}
        className="btn btn-secondary"
      >
        Back
      </button>

      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                name="name"
                value={data.name}
                onChange={handelChange}
                type="name"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            {error && data.name.length <= 0 ? (
              <label className="error">Name filed can't be empty</label>
            ) : (
              ""
            )}
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handelChange}
                className="form-control"
              />
            </div>
            {error && data.email.length <= 0 ? (
              <label className="error">Email filed can't be empty</label>
            ) : (
              ""
            )}
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                value={data.age}
                name="age"
                onChange={handelChange}
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            {error && data.age.length <= 0 ? (
              <label className="error">Age filed can't be empty</label>
            ) : (
              ""
            )}
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                value={data.address}
                name="address"
                onChange={handelChange}
                className="form-control"
              />
            </div>
            {error && data.address.length <= 0 ? (
              <label className="error">Address filed can't be empty</label>
            ) : (
              ""
            )}
          </div>

          <button
            type="submit"
            onClick={handelClick}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ADDdata;
