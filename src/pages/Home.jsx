import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css.css";

const API_URL = "https://backup-0k8h.onrender.com"; // your backend on Render

function Home() {
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

  const handleDelete = async (anyId) => {
    const ok = window.confirm("Are you sure you want to delete this receipt?");
    if (!ok) return;

    try {
      // support either Mongo _id or your own id
      const id =
        typeof anyId === "string" || typeof anyId === "number" ? anyId : "";
      const res = await fetch(`${API_URL}/api/receipts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setReceipts((prev) => prev.filter((rec) => (rec._id || rec.id) !== id));
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
            const rid = receipt._id || receipt.id;
            return (
              <li className="link" key={rid}>
                <Link to="/receipt">
                  {receipt.name} - ₪{receipt.amount} - {receipt.date} -{" "}
                  {receipt.id || receipt._id}
                </Link>
                <button onClick={() => handleDelete(rid)}>תמחק</button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Home;
