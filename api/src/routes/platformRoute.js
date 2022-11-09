const express = require("express");
const router = express.Router();
const{ getPlatforms}= require('../controllers');

router.get("/", async (req, res) => {
    try {
    let response = await getPlatforms();
    res.status(200).send(response);
    } catch (error) {
    res.status(400).send(error);
    }
});

module.exports = router;