import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    age: "",
    address: "",
  });
  const [state, setState] = useState(data);

  const handelChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const getdata = async () => {
    const res = await fetch(`/getusers/${id}`, {
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
      setData(data[0]);
      console.log("get data");
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  const handelClick = async (e) => {
    e.preventDefault();

    const { name, email, age, address } = data;

    const res2 = await fetch(`/updateuser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        age,
        address,
      }),
    });
    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("fill the data");
    } else {
      navigate("/dashbord");
      setState(data2);
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
              <label>Name filed can't be empty</label>
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
              <label>Email filed can't be empty</label>
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
              <label>Age filed can't be empty</label>
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
              <label>Address filed can't be empty</label>
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

export default Edit;
