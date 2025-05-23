const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const {
  changeUserRole,
  getAllUsers,
  deleteUser,
  updateUser,
  updatePassword,
  logoutUser,
} = require("../controllers/userController");

router.patch("/:id/role", protect, isAdmin, changeUserRole);
router.get("/", protect, isAdmin, getAllUsers);
router.delete("/:id", protect, isAdmin, deleteUser);
router.put("/:id", protect, updateUser);
router.put("/:id/password", protect, updatePassword);
router.post("/logout", protect, logoutUser);

module.exports = router;
