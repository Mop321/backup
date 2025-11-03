import React, { useEffect, useState } from "react";
import "./receipt.css";

const API_URL = "https://backup-0k8h.onrender.com"; // backend on Render

function Receipt() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/receipts`, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setReceipts(Array.isArray(data) ? data : []);
      } catch (e) {
        setErr(e.message || "API error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>טוען…</p>;
  if (err) return <p>שגיאה: {String(err)}</p>;
  if (!receipts.length) return <p>אין נתונים להצגה</p>;

  const amount = Number(latest.amount || 0) || 0;
  const totalWithoutVat = amount / 1.18;
  const vatAmount = amount - totalWithoutVat;

  // ✅ format numbers: commas every 3 digits, 2 decimals
  const formatNumber = (num) =>
    Number(num || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="receipt">
      <header>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h2>יהושע להב </h2>
            <p>מומחה למחלות עיניים ומנתח</p>
            <p>מרפאה: דרך ההגנה 57, תל אביב</p>
            <p>טלפון: 03-6390834</p>
            <p>ע.מ 310942784</p>
          </div>
          <div className="receipt2">
            <h2>.Yohoshoa Lahav</h2>
            <p>Eye Specialist & Surgeon</p>
          </div>
        </div>
        <h1 style={{ textAlign: "center", marginTop: 20 }}>
          חשבונית מס / קבלה מס׳:{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>{latest.id}</span>
        </h1>
        <p>לכבוד: {latest.name}</p>
      </header>

      <section>
        <table>
          <thead>
            <tr>
              <th style={{ width: "70%" }}>פרטים</th>
              <th style={{ width: "30%" }}>סכום בש"ח</th>
            </tr>
          </thead>
        </table>

        <table>
          <tbody>
            <tr>
              <td rowSpan="6" style={{ verticalAlign: "top", width: "70%" }}>
                {latest.item}
              </td>
              <td style={{ width: "30%" }}>&nbsp;</td>
            </tr>
            {[...Array(5)].map((_, idx) => (
              <tr key={idx}>
                <td>&nbsp;</td>
              </tr>
            ))}
            <tr>
              <td colSpan="2" className="tds">
                סה"כ: ₪{formatNumber(totalWithoutVat)}
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="tds">
                מע"מ : ₪{formatNumber(vatAmount)}
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="tds a">
                סה"כ כולל מע"מ: ₪{formatNumber(amount)}
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ textAlign: "right" }}>
          <p>תאריך: {latest.date}</p>
        </div>
      </section>

      <footer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "40px",
          }}
        >
          <p>חתימת עסק מורשה:</p>
          <p style={{ margin: "0 auto" }}>חתימה:</p>
        </div>
      </footer>
    </div>
  );
}

export default Receipt;
