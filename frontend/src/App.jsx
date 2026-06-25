import { useState, useRef } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./home.jsx";
import DeepLearning from "./deepLearning.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deep-learning" element={<DeepLearning />} />
      </Routes>
    </>
  );
}

export default App;
