import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css.css";

function Home() {
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this receipt?"
    );
    if (!confirm) return;

    await fetch(`http://localhost:3000/api/receipts/${id}`, {
      method: "DELETE",
    });

    // עדכן את הרשימה אחרי מחיקה
    setReceipts((prev) => prev.filter((rec) => rec.id !== id));
  };
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/receipts")
      .then((res) => res.json())
      .then((data) => setReceipts(data));
  }, []);

  return (
    <section className="Home">
      <div className="container">
        <h1>שלום יהושע להב</h1>
        <Link to="/create">
          <button>צור קבלה חדשה</button>
        </Link>

        <ul className="recepits_data">
          {receipts.map((receipt) => (
            <li className="link" key={receipt._id}>
              <Link to="/receipt">
                {receipt.name} - ₪{receipt.amount} - {receipt.date} -{" "}
                {receipt.id}
              </Link>
              <button onClick={() => handleDelete(receipt.id)}>תמחק</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Home;
