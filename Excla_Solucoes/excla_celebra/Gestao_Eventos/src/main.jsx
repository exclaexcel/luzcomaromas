import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App";
import AppDashboard from "./AppDashboard";
import QuantidadesPage from "./QuantidadesPage";
import PainelFinanceiroPage from "./PainelFinanceiroPage";
import LoginPage from "./LoginPage";
import CalendarioPage from "./CalendarioPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/app" element={<AppDashboard />} />
        <Route path="/quantidades" element={<QuantidadesPage />} />
        <Route path="/painel-financeiro" element={<PainelFinanceiroPage />} />
        <Route path="/calendario" element={<CalendarioPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
