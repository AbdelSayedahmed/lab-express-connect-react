import React from "react";
import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Logs from "./components/Logs";
import EditLog from "./components/EditLog";
import Log from "./components/Log";
import NewLog from "./components/NewLog";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/logs/new" element={<NewLog />} />
        <Route path="/logs/:id" element={<Log />} />
        <Route path="/logs/:id/edit" element={<EditLog />} />
      </Routes>
    </>
  );
}
