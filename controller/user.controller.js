const User = require('../model/index')

const getLoginForm = (req,res)=>{
    res.render('login/layout')
}
const login = (req,res)=>{}
const getSignupForm = (req,res)=>{res.render('signup/layout')}
const signup = async(req,res)=>{
    const {email,password} = req.body
    await User.create({email,password})
    res.render('signup/layout',{message:'User Created'})
}

module.exports = {getLoginForm,login,getSignupForm,signup}