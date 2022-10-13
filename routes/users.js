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
            const user = await User.findByIdAndUpdate(req.body.id, {
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
router.delete('/:id', async (req,res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin){
        //! If user wants to update other fields;
        try {
            // await User.findByIdAndDelete(req.params.id);
            await User.deleteOne({ _id: req.params.id});
            res.status(200).json({
                status: 'success',
                message: 'Account has been deleted succesfully!',
            })
            
        } catch (err) {
            return res.status(500).json(err)
        }

    } else {
        return res.status(403).json({
            status: "error",
            message:'You can delete only your account!'
        })
    }
})

//! Get a User

router.get('/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json({
            status: 'success',
            other
        })
    } catch (err) {
        return res.status(500).json(err)
    }
})

//! Follow User
//! Unfollow User



module.exports = router;