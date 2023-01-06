import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashbord from "./Component/Dashbord";
import Edit from "./Component/Edit";
import ADDdata from "./Component/ADDdata";
import Register from "./Component/Register";
import Login from "./Component/Login";
import { ToastContainer } from "react-toastify";
import Profile from "./Component/Profile";

function App() {
  console.log("hello worl");
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
      </Routes>
    </div>
  );
}

export default App;
