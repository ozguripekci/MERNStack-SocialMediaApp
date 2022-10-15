const router = require("express").Router();
const Post = require('../models/Post')
const User = require('../models/User')

//! CREATE A POST
router.post('/', async (req, res) => {
    const newPost = await new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json({
            status: 'success',
            message: 'The Post is created succesfully!',
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


//! LIKE & DISLIKE A POST
router.put('/:id/like', async(req, res) => {
    try {
        //! LIKE
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push:{ likes:req.body.userId }})
            res.status(200).json({
                status:'success',
                message: `You liked this post!`
            })

        //! DON'T LIKE yourself
        } else if (post.userId === req.body.userId) {
            res.status(403).json({
                status:'failed',
                message: `You can't like your own post!`
            })

        //! DISLIKE
        } else {
            await post.updateOne({$pull:{ likes:req.body.userId }})
            res.status(403).json({
                status: 'success',
                message: `You dislike this post!`,
            })
        }
    } catch (err) {
        return res.status(500).json(err)
    }
})


//! GET A POST
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        return res.status(500).json(err)

    } catch (err) {
        return res.status(500).json(err)
        
    }
})

//! GET TIMELINE POSTS
router.get('/timeline/all', async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({ userId: currentUser._id})
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId})
            })
        )
        res.status(200).json({
            status:'success',
            message: 'You can see your timeline.',
            friendPosts: userPosts.concat(...friendPosts)
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
})


module.exports= router;