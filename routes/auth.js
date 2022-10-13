const router = require("express").Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')


//! REGISTER
router.post("/register", async (req, res) => {
    
    try {
        //! Generate HASH for password in DB
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        //! Generate User
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        //! Save user to DB
        const user = await newUser.save()
        res.status(200).json({
            status : 'success',
            user
        })

    //! Send error message if the POST method is not success;
    } catch (err) {
        return res.status(500).json(err)
    }
});




//! LOGIN
router.post('/login', async(req, res) => {
    try {
        //! Check for email
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            res.status(404).json({
                error:'User not found!' 
            })
        }

        //! Check for password validation
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            res.status(400).json({
                error:'Password is not correct!' 
            })
        }

        //! If email and password is correct;
        res.status(200).json({
            status:'success',
            message: 'Login is succesful',
            user
        })

    //! Send error message if the POST method is not success;
    } catch (err) {
        return res.status(500).json(err)
    }
})


module.exports = router;