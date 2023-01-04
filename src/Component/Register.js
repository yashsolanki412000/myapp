import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [err, setErr] = useState(false);
  const [register, setRegister] = useState("");
  const [state, setState] = useState({
    email: "",
    password: "",
    username: "",
  });
  const handelChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  const handelClick = (e) => {
    e.preventDefault();
    if (
      state.username.length === 0 ||
      state.email.length === 0 ||
      state.password.length === 0
    ) {
      setError(true);
    } else {
      axios
        .post(" http://localhost:8001/register", state)
        .then((res) => {
          if (res.status === 422) {
            toast.error("This email alredy use ");
          }
        })
        .catch((err) => console.log(err));
      // navigate("/dashbord")
    }
  };

  return (
    <div>
      <ToastContainer />
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="btn btn-primary"
      >
        Login
      </button>

      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                name="username"
                value={state.name}
                onChange={handelChange}
                type="name"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            {error && state.username.length <= 0 ? (
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
                value={state.email}
                onChange={handelChange}
                className="form-control"
              />
            </div>
            {error && state.email.length <= 0 ? (
              <label className="error">Email filed can't be empty</label>
            ) : (
              ""
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="text"
              value={state.password}
              name="password"
              onChange={handelChange}
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>
          {error && state.password.length <= 0 ? (
            <label className="error">Password filed can't be empty</label>
          ) : (
            ""
          )}
          <button
            type="submit"
            onClick={handelClick}
            className="btn btn-primary"
          >
            Submit
          </button>
          <div></div>
        </div>
      </form>
    </div>
  );
}

export default Register;
