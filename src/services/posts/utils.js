import POST_SCHEMA from '../../db/Schemas/Posts.js'
import macaddress from 'macaddress'

const create = async (req, res, next) => {
    try {
        const { body } = req

        const newPost = new POST_SCHEMA(body)
        const savedPost = await newPost.save({ new: true })

        if (savedPost._id) {
            res.status(201).send({
                success: true,
                savedPost
            })
            return
        }
    } catch (error) {
        console.log(error)
        next()
    }
}

const saveImgUrl = async (req, res, next) => {
    try {
        const { postId } = req.params
        const { path: img_url } = req.file

        const updatedPost = await POST_SCHEMA.findByIdAndUpdate(
            postId,
            { img_url: img_url },
            { projection: { _id: 1 }, new: true }
        )

        if (!updatedPost) {
            res.status(400).send({
                success: false,
                msg: 'Something went wrong'
            })
        } else {
            res.status(200).send({
                success: true,
                updatedPost: updatedPost[0]
            })
        }
    } catch (error) {
        console.log(error)
        next()
    }
}

const getPosts = async (req, res, next) => {
    try {
        const all_posts = await POST_SCHEMA.find()
        if (all_posts.length > 0) {
            res.status(200).send({
                success: true,
                all_posts
            })
        } else {
            res.status(404).send({
                success: false,
                msg: 'No posts found'
            })
        }
    } catch (error) {
        console.log(error)
        next()
    }
}

const handleLike = async (req, res, next) => {
    try {
        const { postId } = req.params
        const mac = await macaddress.one()
        const isPostLiked = await POST_SCHEMA.find({
            _id: postId,
            likes: mac
        })

        if (!isPostLiked) {
            res.status(400).send({
                success: false,
                msg: 'Something went wrong'
            })
        } else if (isPostLiked[0]?.likes.includes(mac)) {
            const updatedPost = await POST_SCHEMA.findByIdAndUpdate(
                postId,
                { $pull: { likes: mac } },
                { projection: { likes: 1 }, new: true }
            )
            const likes = updatedPost.likes.length
            res.status(201).send({
                success: true,
                likes
            })
        } else {
            const updatedPost = await POST_SCHEMA.findByIdAndUpdate(
                postId,
                { $push: { likes: mac } },
                { projection: { likes: 1 }, new: true }
            )
            const likes = updatedPost.likes.length
            res.status(201).send({
                success: true,
                likes
            })
        }
    } catch (error) {
        console.log(error)
        next()
    }
}

const editPost = async (req, res, next) => {
    try {
        const { postId } = req.params
        const { body } = req

        const updatedPost = await POST_SCHEMA.findByIdAndUpdate(postId, body, {
            new: true
        })

        if (updatedPost) {
            res.status(200).send({
                success: true,
                updatedPost: updatedPost
            })
        } else {
            res.status(400).send({
                success: false,
                msg: 'Something went wrong'
            })
        }
    } catch (error) {
        next()
    }
}

const posts_utils = { create, saveImgUrl, getPosts, handleLike, editPost }

export default posts_utils
