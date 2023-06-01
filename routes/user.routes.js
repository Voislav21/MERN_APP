const express = require ('express');
const router = express.Router();
const { user } = require ('../models');

router.get("/", async (req,res) => {
    const allUsers = await user.findAll();
    res.json(allUsers);
});

router.post("/", async (req,res) => {
    const login = req.body;

    await user.create(login);
    res.json(login);


});

module.exports = router;