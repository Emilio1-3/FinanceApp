import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!localStorage.getItem("token"));

  useEffect(() => {
      const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));
      window.addEventListener("storage", checkAuth);
      return () => window.removeEventListener("storage", checkAuth);
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route 
          path="/"
          element={
            isAuthenticated ? (<Navigate to="/dashboard" />) : (<AuthPage setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        <Route 
          path="/dashboard"
          element={
            isAuthenticated ? (<Layout setIsAuthenticated={setIsAuthenticated}> 
              <Dashboard />
            </Layout> ): ( <Navigate to="/" />)
          }
        />
      </Routes>
    </Router>
  );
}

export default App;