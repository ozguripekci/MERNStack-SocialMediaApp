const router = require("express").Router();

router.get("/", (req, res) => {
    res.send('This is auth route!')
})


module.exports = router;