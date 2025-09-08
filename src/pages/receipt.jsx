import React from "react";
import "./receipt.css";

function Receipt({ data }) {
  if (!data) return <p>אין נתונים להצגה</p>;

  const amount = Number(data.amount || 0);
  const totalWithoutVat = amount / 1.17;
  const vatAmount = amount - totalWithoutVat;

  // ✅ simple formatter: commas every 3 digits, 2 decimals
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
          <span style={{ color: "red", fontWeight: "bold" }}>{data.id}</span>
        </h1>
        <p>לכבוד: {data.name}</p>
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
                {data.item}
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
                סה"כ: {formatNumber(totalWithoutVat)}
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="tds">
                מע"מ : {formatNumber(vatAmount)}
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="tds a">
                סה"כ כולל מע"מ: {formatNumber(amount)}
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ textAlign: "right" }}>
          <p>תאריך: {data.date}</p>
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
