const express = require("express");
const {
  createUser,
  updateUser,
  getAllUsers,
  getSystemUsers,
  detailUser,
  login,
  deleteUser,
  logout
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/user", createUser);
router.get("/users", getAllUsers);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.get("/user/:id", detailUser);
router.get("/user/system/:id", getSystemUsers);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
