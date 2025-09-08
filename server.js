import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://aweds200:s1pAaBaqk9NwKna8@cluster0.tgmqsj3.mongodb.net/receiptDB?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 🧠 Define schema and model
const ReceiptInfo = new mongoose.Schema({
  id: String,
  name: String,
  amount: Number,
  date: String,
  item: String,
  quantity: Number,
  paymentType: String,
});

const receipt = mongoose.model("Receipt", ReceiptInfo);

// 🧾 Add receipt
app.post("/api/receipts", async (req, res) => {
  try {
    const allReceipts = await receipt.find().sort({ id: 1 });
    const nextId = String(allReceipts.length + 1).padStart(4, "0");

    const newRec = new receipt({ ...req.body, id: nextId });
    await newRec.save();
    res.send(newRec);
  } catch (err) {
    res.status(500).send({ error: "Failed to create receipt" });
  }
});

// 📋 Get receipts
app.get("/api/receipts", async (req, res) => {
  try {
    const receipts = await receipt.find().sort({ id: 1 });
    res.send(receipts);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch receipts" });
  }
});

// ❌ Delete receipt and reorder
app.delete("/api/receipts/:id", async (req, res) => {
  try {
    await receipt.deleteOne({ id: req.params.id });

    const updatedReceipts = await receipt.find().sort({ date: 1 });
    for (let i = 0; i < updatedReceipts.length; i++) {
      updatedReceipts[i].id = String(i + 1).padStart(4, "0");
      await updatedReceipts[i].save();
    }

    res.send({ message: "Deleted and reordered" });
  } catch (err) {
    res.status(500).send({ error: "Failed to delete receipt" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
