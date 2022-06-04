const User = require('../model/index')
const bcrypt = require('bcrypt')
const config = require('config')
const {userValidatorSchema} = require('../validator/user.validator')

const getLoginForm = (req,res)=>{
    res.render('login/layout')
}
const login = async(req,res)=>{
    const {email,password} = req.body
    const findUser = await User.findOne({email})
    if(!findUser){
        return res.render('signup/layout',{message:'User does not exist please Signup'})
    }
    const matchpassword = await bcrypt.compare(password,findUser.password)
    if(!matchpassword){
        return res.render('login/layout',{message:"Email or password wrong"})
    }
    return res.render('user/layout')
}


const getSignupForm = (req,res)=>{res.render('signup/layout')}
const signup = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const {error,value} = userValidatorSchema(fields)
    if(error){
        return res.render('signup/layout',{message:error.details[0].message})
    }
    const hashedPassword = await bcrypt.hash(password,config.get('hashed.salt'))
    const findUser = await User.findOne({email})
    if(findUser){
        return res.render('login/layout',{message:"Email already Exists login"})
    }
    const createEntry = await User.create({email,password:hashedPassword})
    res.render('signup/layout',{message:'User Created'})
}

module.exports = {getLoginForm,login,getSignupForm,signup}