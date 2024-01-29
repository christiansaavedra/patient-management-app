import NotFoundLayout from "common/layouts/not-found";
import PatientsLayout from "features/patients/components/layout";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/patients" replace />} />
        <Route path="/patients" element={<PatientsLayout />} />
        <Route path="*" element={<NotFoundLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
