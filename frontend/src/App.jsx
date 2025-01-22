import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Room from "./pages/room";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:id" element={<Room />} />
    </Routes>
  );
};

export default App;
