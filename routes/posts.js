const router = require("express").Router();
const Post = require('../models/Post')

//! CREATE A POST
router.post('/', async (req, res) => {
    const newPost = await new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json({
            status: 'success',
            message: 'The Post  is created succesfully!',
            savedPost
        })
    } catch (err) {
        return res.status(500).json(err)
    }
})

//! UPDATE A POST
router.put('/:id', async(req, res) => {

    try {
        const post = await Post.findById(req.params.id);

        // If the userid and post's userid is same;
        if(post.userId === req.body.userId) {
            await post.updateOne({$set:req.body})
            res.status(200).json({
                status: 'success',
                message: 'The Post is updated succesfully!',
            })
        }else{
            res.status(403).json({
                status: 'failed',
                message: `You can update only your posts!`,
            })
        }
        
    } catch (err) {
        return res.status(500).json(err)
    }

})

//! DELETE A POST
router.delete('/:id', async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // If the userid and post's userid is same;
        if(post.userId === req.body.userId) {
            await post.deleteOne()
            res.status(200).json({
                status: 'success',
                message: 'The Post is deleted succesfully!',
            })
        }else{
            res.status(403).json({
                status: 'failed',
                message: `You can delete only your posts!`,
            })
        }
        
    } catch (err) {
        return res.status(500).json(err)
    }

})
//! LIKE A POST
//! GET A POST
//! GET TIMELINE POSTS


module.exports= router;