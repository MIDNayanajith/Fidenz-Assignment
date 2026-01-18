import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Callback from "./pages/Callback";
import ProtectedDashboard from "./pages/Dashboard";

const App = () => {
  return (
    <>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/dashboard" element={<ProtectedDashboard />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
