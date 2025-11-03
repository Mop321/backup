import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateReceipt from "./pages/createRec";
import Receipt from "./pages/receipt";
import Home from "./pages/Home";

const url = "https://backup-0k8h.onrender.com";
function App() {
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`${url}/users`);
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.error("API error:", err);
      }
    }
    fetchUsers();
  }, []);

  const handleCreate = (data) => {
    setReceiptData(data);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateReceipt />} />
        <Route path="/receipt/:id" element={<Receipt />} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
