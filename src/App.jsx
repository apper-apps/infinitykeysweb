import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import StudioPage from "@/components/pages/StudioPage";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-800 via-primary-500 to-primary-600">
      <Routes>
        <Route path="/" element={<StudioPage />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;