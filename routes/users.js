const router = require("express").Router();
const User = require('../models/User')



router.get("/", (req, res) => {
    res.send('This is user route!')
})


module.exports = router;