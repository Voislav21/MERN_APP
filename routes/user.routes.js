const express = require ('express');
const router = express.Router();

const userCtrl = require ('../controllers/uset.ctrl');
const friendshipCtrl = require ('../controllers/friendship.controller')

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getUserInfo);

router.post('/users/:userId/request-friendship/:friendId', friendshipCtrl.requestFriendship);
router.post('/users/:userId/accepted/:friendId', friendshipCtrl.acceptFriendRequest);
router.get('/users/:userId/friends', userCtrl.getFriendsList);

module.exports = router;