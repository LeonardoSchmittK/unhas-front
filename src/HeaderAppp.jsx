import React from "react";
import { useNavigate } from "react-router";

function HeaderApp() {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-gradient-to-r from-slate-100 to-slate-200 p-5">
      <header className="w-full flex flex-row items-center justify-between">
        <h1 className="text-xl">Unhas da Lu :)</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 transition p-3 rounded"
          onClick={() => navigate("/nova")}
        >
          Adicionar unha
        </button>
      </header>
    </div>
  );
}

export default HeaderApp;
