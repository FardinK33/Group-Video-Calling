import React from "react";
import Home from "./pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Room from "./pages/Room";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:id" element={<Room />} />
      // Catching all the invalid routes and redirecting them to Homepage
      //replace - ensure browser's history update correctly (prevents from
      navigating back to invalid route)
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
