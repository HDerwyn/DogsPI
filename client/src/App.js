import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import FormPage from "./views/FormPage/FormPage";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/formPage" element={<FormPage />} />
      </Routes>
    </div>
  );
}

export default App;
