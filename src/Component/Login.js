import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [singin, setSingin] = useState("");
  const [error, setError] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
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
    axios
      .post(" http://localhost:8001/login", state)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token",res.data.token)
        if (res.status === 200) {
          toast.success("Success");
          navigate("/dashbord");
        } else {
          setSingin(res.data[0].email);
        }
      })
      .catch((err) => {
        if (state.email.length === 0 && state.password.length === 0) {
          toast.error("Please fill input filed");
        } else if (err) {
          toast.error("Please check email and password");
        }
      });
  };
  return (
    <div>
      <form>
        <div className="row">
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
              <label>Email filed can't be empty</label>
            ) : (
              ""
            )}
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="text"
                value={state.password}
                name="password"
                onChange={handelChange}
                className="form-control"
              />
            </div>
            {error && state.password.length <= 0 ? (
              <label>Age filed can't be empty</label>
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

export default Login;
