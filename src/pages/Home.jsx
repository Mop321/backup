import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css.css";

const API_URL = "https://backup-0k8h.onrender.com";

function Home() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  async function fetchAll() {
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
  }

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      alert("Missing receipt id");
      return;
    }
    const ok = window.confirm("Are you sure you want to delete this receipt?");
    if (!ok) return;
    try {
      const res = await fetch(
        `${API_URL}/api/receipts/${encodeURIComponent(id)}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchAll();
    } catch (e) {
      alert(`Delete failed: ${e.message || e}`);
    }
  };

  if (loading)
    return (
      <section className="Home">
        <div className="container">
          <p>Loading…</p>
        </div>
      </section>
    );
  if (err)
    return (
      <section className="Home">
        <div className="container">
          <p style={{ color: "red" }}>Error: {err}</p>
        </div>
      </section>
    );

  return (
    <section className="Home">
      <div className="container">
        <h1>שלום יהושע להב</h1>
        <Link to="/create">
          <button>צור קבלה חדשה</button>
        </Link>
        <ul className="recepits_data">
          {receipts.map((receipt) => {
            const prettyId = receipt.id || receipt._id;
            return (
              <li className="link" key={receipt._id || receipt.id}>
                {/* Link sends to /receipt/:id */}
                <Link to={`/receipt/${prettyId}`}>
                  {receipt.name} - ₪{receipt.amount} - {receipt.date} -{" "}
                  {prettyId}
                </Link>
                <button onClick={() => handleDelete(receipt.id)}>תמחק</button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Home;