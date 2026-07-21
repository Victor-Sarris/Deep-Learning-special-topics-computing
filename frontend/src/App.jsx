import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./home.jsx";
import DeepLearning from "./deepLearning.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/deep-learning" element={<DeepLearning />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
