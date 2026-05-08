const router = require("express").Router();
const axios = require("axios");
const auth = require("../middleware/auth");
const History = require("../models/DetectionHistory");
const Report = require("../models/ScamReport");

const ML = process.env.ML_SERVICE_URL || "http://localhost:5001";

router.post("/analyze", auth, async (req, res) => {
  try {
    const { input, type = "message" } = req.body;
    const { data } = await axios.post(`${ML}/analyze`, { input });
    await History.create({
      user_id: req.user.id, input_type: type, input_text: input,
      verdict: data.verdict, confidence: data.confidence, category: data.category,
      indicators: data.indicators || [], explanation: data.explanation,
      recommendations: data.recommendations || [],
    });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post("/predict", auth, async (req, res) => {
  try {
    const { data } = await axios.post(`${ML}/predict`, { input: req.body.input });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post("/report", auth, async (req, res) => {
  const r = await Report.create({ user_id: req.user.id, ...req.body });
  res.json(r);
});

router.get("/history", auth, async (req, res) => {
  const rows = await History.find({ user_id: req.user.id }).sort({ createdAt: -1 }).limit(100);
  res.json(rows);
});

module.exports = router;
