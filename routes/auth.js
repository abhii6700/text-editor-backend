const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('../validation')



router.post('/register', async (req, res) => {

    //VALIDATE THE DATA
    const {error} = registerValidation(req.body)
    if(error) return res.status(500).send(error.details[0].message)

    //Checking if user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(501).send('Email already exists')

    //HASH PASSWORD
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err){
        console.log(err)
    }
})

// LOGIN USER
router.post('/login', async (req, res) => {

//VALIDATE THE DATA
const {error} = loginValidation(req.body)
if(error) return res.status(500).send(error.details[0].message)

//Checking if user is already in the database
const user = await User.findOne({email: req.body.email});
if(!user) return res.status(502).send('User not found')

//CHECKING PASSWORD
const validPassword = await bcrypt.compare(req.body.password, user.password)
if(!validPassword) return res.status(502).send('Invalid Password')

//CREATE AND ASSIGN AN TOKEN
const token = jwt.sign({_id: user._id, role: user.role}, process.env.TOKEN_SECRET);
res.header('auth-token', token).send({
    auth_token: token,
    role: user.role
})


})


module.exports = router