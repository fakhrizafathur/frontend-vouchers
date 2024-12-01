import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import History from "./pages/History";
import "./styles/App.css";

function App() {
  return (
    <Router basename="/frontend-vouchers">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
