

const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetailsById,
} = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUserById/:id", authMiddleware, getUserDetailsById);

module.exports = router;
