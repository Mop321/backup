import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./create.css";

const API_URL = "https://backup-0k8h.onrender.com"; // ה־backend שלך ב-Render

function CreateReceipt({ addReceipt }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    amount: "", // נשמור כטקסט בזמן כתיבה כדי לא לאבד נקודה/פסיק
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

    // נורמליזציה לשדה סכום: תומך גם בפסיק וגם בנקודה, ומוריד רווחים
    if (name === "amount") {
      const normalized = value.replace(/\s/g, "").replace(/,/g, ".");
      return setFormData((prev) => ({ ...prev, amount: normalized }));
    }

    if (name === "quantity") {
      const q = parseFloat(value);
      return setFormData((prev) => ({
        ...prev,
        quantity: Number.isFinite(q) ? q : "",
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErr(null);
    try {
      // המרה סופית למספר לפני שליחה
      const amountNum = parseFloat(String(formData.amount).replace(/,/g, "."));
      const quantityNum = parseFloat(String(formData.quantity));
      const payload = {
        ...formData,
        amount: Number.isFinite(amountNum) ? amountNum : 0,
        quantity: Number.isFinite(quantityNum) ? quantityNum : 1,
      };

      const res = await fetch(`${API_URL}/api/receipts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
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

        {/* סכום תומך אגורות; inputMode decimal כדי שמקלדת ניידת תציג נקודה */}
        <input
          name="amount"
          placeholder="סכום כולל (למשל 205691.73)"
          type="number"
          step="0.01"
          inputMode="decimal"
          onChange={handleChange}
          value={formData.amount}
        />

        <input
          name="date"
          placeholder="תאריך"
          type="date"
          onChange={handleChange}
          value={formData.date}
        />

        <input
          name="paymentType"
          placeholder="אמצעי תשלום"
          onChange={handleChange}
          value={formData.paymentType}
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
