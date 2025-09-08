import React, { useEffect, useState } from "react";
import "./receipt.css";

function Receipt() {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/receipts")
      .then((res) => res.json())
      .then((data) => setReceipts(data));
  }, []);

  if (receipts.length === 0) return <p>אין נתונים להצגה</p>;

  const latest = receipts[receipts.length - 1];
  const amount = parseFloat(latest.amount);
  const totalWithoutVat = amount / 1.17;
  const vatAmount = amount - totalWithoutVat;

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
          <tbody>
            <tr>
              <td rowSpan="6" style={{ verticalAlign: "top" }}>
                {latest.item}
              </td>
              <td>&nbsp;</td>
            </tr>
            {[...Array(5)].map((_, idx) => (
              <tr key={idx}>
                <td>&nbsp;</td>
              </tr>
            ))}
            <tr>
              <td colSpan="2" className="tds">
                סה"כ: ₪{totalWithoutVat.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="tds">
                מע"מ : ₪{vatAmount.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="tds a">
                סה"כ כולל מע"מ: ₪{amount.toFixed(2)}
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
