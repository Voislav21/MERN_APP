const express = require ('express');
const router = express.Router();

const userCtrl = require ('../controllers/uset.ctrl');

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getUserInfo);

module.exports = router;