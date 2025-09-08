import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateReceipt from "./pages/createRec";
import Receipt from "./pages/receipt";
import Home from "./pages/Home";
function App() {
  const [receiptData, setReceiptData] = useState(null);

  const handleCreate = (data) => {
    setReceiptData(data);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route
          path="/create"
          element={<CreateReceipt addReceipt={handleCreate} />}
        />
        <Route path="/receipt" element={<Receipt data={receiptData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
