import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checklist from "./pages/Checklist";
import ChecklistDetail from "./pages/ChecklistDetail";
import "./App.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const interval = setInterval(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken !== token) {
        setToken(storedToken);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={!token ? <Login /> : <Navigate to="/checklist" />} />
          <Route path="/register" element={!token ? <Register /> : <Navigate to="/checklist" />} />
          <Route path="/checklist" element={token ? <Checklist /> : <Navigate to="/" />} />
          <Route path="/checklist/:id" element={token ? <ChecklistDetail /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
