import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Report from "./components/Report";
import Contact from "./components/Contact";
import About from "./components/About";
import Found from "./components/Found";
import Login from "./components/Login";
import Register from "./components/Register";
import Manage from "./components/Manage";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/found" element={<Found />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/report" element={<Report />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manage" element={<Manage />} />
      </Routes>
    </Router>
  );
};
//

export default App;
