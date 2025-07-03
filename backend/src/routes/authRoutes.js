

const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetailsById,
  getAllHrs
} = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUserById/:id", authMiddleware, getUserDetailsById);
router.get("/get_all_hr", getAllHrs);

module.exports = router;
