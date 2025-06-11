import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import Layout from "./components/Layout";
import './index.css';

function App() {
  const isAuthenticated = localStorage.getItem("token");
  
  return (
    <Router>
      <Routes>
        <Route 
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <AuthPage />
          }
        />

        <Route 
          path="/dashboard"
          element={
            isAuthenticated ? (<Layout> 
              <Dashboard />
            </Layout> ): ( <Navigate to="/" />)
          }
        />
      </Routes>
    </Router>
  );
}

export default App;