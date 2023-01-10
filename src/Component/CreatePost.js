import axios from "axios";
import React, { useEffect, useState } from "react";

function CreatePost() {
  const [userData, setUserData] = useState([]);
  const [state, setState] = useState({
    title: "",
    slug: "",
    image: "",
    desc: "",
    status: true,
  });
  useEffect(() => {
    console.log("hello");
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
        }
      })
      .catch((err) => {});
  }
  const randumstring = (length) => {
    console.log("length", length);
    var a = "";
    var b = "abcdefghijklmnopqrstuvwxyz0123456789";
    var c = b.length;
    
    for (let i = 0; i < length; i++) {
      a += b.charAt(Math.floor(Math.random() * c));
    }
    return a;

  };
  const uploadimage = (e) => {
    const images = new FileReader();
    images.onload = (event) => {
      state.image = event.target.result;
    };
    images.readAsDataURL(e.target.files[0]);
  };

  const randomslug = () => {
    const newtitle = state.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    const titleSlug = `${newtitle}-${randumstring(7)}`;
    state.slug = titleSlug;
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    randomslug();
    const sendresponse = {
      title: state.title,
      desc: state.desc,
      image: state.image,
      slug: state.slug,
      userid: userData[0].id,
      status: state.status,
    };
    await axios
      .post("http://localhost:8001/userdetailes", sendresponse)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={state.title}
              onChange={(e) => setState({ ...state, title: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Slug</label>
           
            <input
              type="text"
              name="slug"
              defaultValue={state.slug}
              className="form-control"
              readOnly
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Image</label>
            <input
              onChange={(e) => uploadimage(e)}
              type="file"
              className="form-control"
            />
          </div>
          <label className="form-label">Description</label>
          <textarea
            name="desc"
            value={state.desc}
            onChange={(e) => setState({ ...state, desc: e.target.value })}
          />
          <br />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
