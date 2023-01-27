import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashbord from "./Component/Dashbord";
import Edit from "./Component/Edit";
import ADDdata from "./Component/ADDdata";
import Register from "./Component/Register";
import Login from "./Component/Login";
import { ToastContainer } from "react-toastify";
import Profile from "./Component/Profile";
import CreatePost from "./Component/CreatePost";
import Post from "./Component/Post";
import PostDetail from "./Component/PostDetail";
import Test from "./Component/Test";
import Price from "./Component/Price"
import { useEffect, useState } from "react";
import axios from "axios";


function App() {
  // const [product,setProduct] = useState([])

  // useEffect(()=>{
  //   axios.get("https://fakestoreapi.com/products")
  //   .then((res) => setProduct(res.data))
  //   .catch((err) => console.log(err));
  // })

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/singup" element={<ADDdata />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createpost" element={<CreatePost/>}/>
        <Route path="/post" element={<Post/>}/>
        <Route path="/postdetail/:slug/:id" element={<PostDetail/>}/>
        <Route path="/test" element={<Test/>}/>
        <Route path="/price" element={<Price/>}/>
      </Routes>
    </div>
  );
}

export default App;
