import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./create.css";

const API_URL = "https://backup-0k8h.onrender.com"; // ה־backend שלך ב-Render

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
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErr(null);
    try {
      const res = await fetch(`${API_URL}/api/receipts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount) || 0,
          quantity: Number(formData.quantity) || 1,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const savedReceipt = await res.json();
      if (typeof addReceipt === "function") addReceipt(savedReceipt);
      navigate("/receipt");
    } catch (e) {
      setErr(e.message || "API error");
    } finally {
      setSubmitting(false);
    }
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
          type=""
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

        {err && <p style={{ color: "red" }}>שגיאה: {err}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? "שולח..." : "צור קבלה"}
        </button>
      </form>
    </div>
  );
}

export default CreateReceipt;
