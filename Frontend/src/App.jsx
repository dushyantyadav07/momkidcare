import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

import Login from "./pages/login/Login";

import Signup from "./pages/login/Signup";
import SessionList from "./components/session/SessionList";
import SessionForm from "./components/session/SessionForm";

function App() {
  return (
    <div>
      <Router>
        <Navbar /> {/* Include the Navbar */}
        <Routes>
          <Route path="/" element={<SessionList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/session" element={<SessionForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
