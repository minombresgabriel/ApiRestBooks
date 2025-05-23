const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const validateBook = require("../middlewares/bookValidator");

const protect = require("../middlewares/authMiddleware");

const adminMiddleware = require("../middlewares/adminMiddleware");

// 📚 Rutas públicas
router.get("/", getBooks);
router.get("/:id", getBookById);

// 🔐 Rutas protegidas
router.post("/", protect, validateBook, createBook);
router.put("/:id", protect, adminMiddleware, validateBook, updateBook);
router.delete("/:id", protect, adminMiddleware, deleteBook);

module.exports = router;
