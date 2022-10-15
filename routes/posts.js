const router = require("express").Router();
const Post = require('../models/Post')

router.get('/', (req, res) => {
    console.log('This is post route!')
})


module.exports= router;