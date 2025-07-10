

const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetailsById,
  getAllHrs,
  getAllUsers
} = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUserById/:id", authMiddleware, getUserDetailsById);
router.get("/getAllUsers", authMiddleware, getAllUsers);
router.get("/get_all_hr", getAllHrs);

module.exports = router;
