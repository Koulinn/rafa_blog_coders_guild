import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema, model } = mongoose

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        avatar: {
            type: String,
            default: 'https://ui-avatars.com/api/?name=Unnamed+User'
        },
        email: { type: String, unique: true, required: true },
        password: { type: String }
    },
    { timestamps: true }
)

UserSchema.statics.checkCredentials = async function (email, password) {
    const user = await this.findOne({ email })

    if (user) {
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) return user
        else return null
    } else {
        return null
    }
}

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next()
})

UserSchema.pre('findOneAndUpdate', async function () {
    const update = this.getUpdate()
    const { password: plainPwd } = update

    if (plainPwd) {
        const password = await bcrypt.hash(plainPwd, 10)
        this.setUpdate({ ...update, password })
    }
})

UserSchema.methods.toJSON = function () {
    const userDocument = this
    const userObject = userDocument.toObject()

    delete userObject.password
    delete userObject.__v

    return userObject
}

export default model('Users', UserSchema)
