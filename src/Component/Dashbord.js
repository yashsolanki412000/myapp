import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
function Dashbord() {
  const navigate = useNavigate();
  const [state, setState] = useState([]);
  const [alldata, setAlldata] = useState(state);

  const getdata = async () => {
    const res = await fetch("/getusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setState(data);
     
    }
  };

  const handelClick = (id) => {
    Axios.delete(`/deleteuser/${id}`, {
      method: "DELETE",
    })
      .then((res) => setAlldata(res))
      .catch((err) => console.log(err));
    getdata();
  };
  const handeledit = (id) => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => navigate("/singup")}
      >
        ADD
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => navigate("/login")}
      >
        Logout
      </button>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        {state.map((el, id) => {
          return (
            <tbody key={el.id}>
              <tr>
                <th scope="row">{id + 1}</th>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.age}</td>

                <td>
                  {" "}
                  <span>
                    <td>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => handeledit(el.id)}
                      >
                        EDIT
                      </button>
                    </td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handelClick(el.id)}
                    >
                      DELETE
                    </button>{" "}
                  </span>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default Dashbord;
