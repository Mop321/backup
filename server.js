import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔒 Direct connection (credentials are visible in code)
mongoose
  .connect(
    "mongodb+srv://aweds200:s1pAaBaqk9NwKna8@cluster0.tgmqsj3.mongodb.net/receiptDB?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 📑 Schema + Model
const ReceiptInfo = new mongoose.Schema({
  id: String,
  name: String,
  amount: Number,
  date: String,
  item: String,
  quantity: Number,
  paymentType: String,
});

const Receipt = mongoose.model("Receipt", ReceiptInfo);

// ➕ Add receipt
app.post("/api/receipts", async (req, res) => {
  try {
    const allReceipts = await Receipt.find().sort({ id: 1 });
    const nextId = String(allReceipts.length + 1).padStart(4, "0");

    const newRec = new Receipt({ ...req.body, id: nextId });
    await newRec.save();
    res.json(newRec);
  } catch (err) {
    res.status(500).json({ error: "Failed to create receipt" });
  }
});

// 📋 Get receipts
app.get("/api/receipts/:id", async (req, res) => {
  try {
    const receipt = await Receipt.findOne({ id: req.params.id });
    if (!receipt) return res.status(404).json({ error: "Receipt not found" });
    res.json(receipt);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch receipts" });
  }
});

// ❌ Delete + reorder IDs
app.delete("/api/receipts/:id", async (req, res) => {
  try {
    await Receipt.deleteOne({ id: req.params.id });

    const updatedReceipts = await Receipt.find().sort({ id: 1 });
    for (let i = 0; i < updatedReceipts.length; i++) {
      updatedReceipts[i].id = String(i + 1).padStart(4, "0");
      await updatedReceipts[i].save();
    }

    res.json({ message: "Deleted and reordered" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete receipt" });
  }
});

// 🚪 Port: keep 3000 local, Render/Heroku will inject PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
