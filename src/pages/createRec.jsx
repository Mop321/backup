import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./create.css";
function CreateReceipt({ addReceipt }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    amount: "",
    date: "",
    item: "",
    quantity: 1,
    paymentType: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/receipts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const savedReceipt = await response.json();
    addReceipt(savedReceipt);
    navigate("/receipt");
  };

  return (
    <div className="container">
      <h2>צור קבלה חדשה</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="שם לקוח" onChange={handleChange} />
        <input name="item" placeholder="פרטים" onChange={handleChange} />
        <input
          name="amount"
          placeholder="סכום כולל"
          type="number"
          onChange={handleChange}
        />
        <input
          name="date"
          placeholder="תאריך"
          type="date"
          onChange={handleChange}
        />
        <input
          name="paymentType"
          placeholder="אמצעי תשלום"
          onChange={handleChange}
        />
        <button type="submit">צור קבלה</button>
      </form>
    </div>
  );
}

export default CreateReceipt;
