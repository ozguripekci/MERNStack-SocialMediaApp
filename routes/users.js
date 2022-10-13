const router = require("express").Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')


//! Update User
router.put('/:id', async (req,res) => {
    if (req.body.userId === req.params.id || req.user.isAdmin) {

        //! If user wants to update password;
        if(req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (err) {
                return res.status(500).json(err)
            }
        }

        //! If user wants to update other fields;
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json({
                status: 'success',
                message: 'Account has been updated!',
                user
            })
            
        } catch (err) {
            return res.status(500).json(err)
        }

    } else {
        return res.status(403).json({
            status: "error",
            message:'You can update only your account!'
        })
    }
})

//! Delete User


//! Get a User
//! Follow User
//! Unfollow User



module.exports = router;