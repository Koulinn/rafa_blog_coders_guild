import mongoose from 'mongoose'

const { Schema, model } = mongoose

const POSTS_SCHEMA = new Schema(
    {
        img_url: { type: String },
        text: { type: String, required: true },
        tag: [String],
        likes: [String],
        // author: { type: Schema.Types.ObjectId, ref: 'Users' }
        author_code: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

export default model('Posts', POSTS_SCHEMA)
