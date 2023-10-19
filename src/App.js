import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './register/register.js';
import Login from './login/login.js';
import Dashboard from "./chatDashboard/dashboard.js"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
