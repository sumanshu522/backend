const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: isEmail
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true })

// Encryting the password before saving
userSchema.pre('save', async function(next){

    if(!this.isModified)
        next()

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})


// method for comapring
userSchema.methods.matchPassword = async function(enteredPassword){

    return await bcrypt.compare(enteredPassword, this.password);

}

const User = mongoose.model('User',userSchema)

module.exports = User