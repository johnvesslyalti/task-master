import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AuthProvider from "./context/AuthContext";
import AddTask from "./pages/AddTask";

export default function App() {
  return (
    <AuthProvider >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/:username/dashboard" element={<Dashboard />} />
          <Route path="/:username/dashboard/addtask" element={<AddTask />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}