import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateReceipt from "./pages/createRec";
import Receipt from "./pages/receipt";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateReceipt />} />
        {/* Use :id param for the receipt page */}
        <Route path="/receipt/:id" element={<Receipt />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
