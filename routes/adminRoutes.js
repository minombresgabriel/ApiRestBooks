const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

router.get("/admin-data", protect, isAdmin, (req, res) => {
  res.json({ message: "Solo los admins pueden ver esto 🚀" });
});

module.exports = router;
