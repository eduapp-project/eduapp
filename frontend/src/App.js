import { BrowserRouter, Routes, Route } from "react-router-dom";
import Resources from "./views/resources/resources";
import Welcome from "./views/welcome/Welcome";
import Login from "./views/login/Login";
import Home from "./views/home/Home";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/home" element={<Home/>}/>
          <Route path="/resources" element={<Resources />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
