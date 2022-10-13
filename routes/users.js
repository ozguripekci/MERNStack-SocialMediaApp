const router = require("express").Router();

router.get("/", (req, res) => {
    res.send('This is user route!')
})


module.exports = router;