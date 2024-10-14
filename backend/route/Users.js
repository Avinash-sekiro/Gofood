const express =require("express")
const route =express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt =require("bcrypt")
const user=require("../modules/user")
let jwt = require('jsonwebtoken');

route.post("/signup",[
    body('email').isEmail(),
    body('password').isLength({min:6}),
    body("name").isLength({min:4})
],async(req,res)=>{
    let success=false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,error:errors.array()})
    }
    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);
  try {
    await user.create({
        name:req.body.name,
        email:req.body.email,
        password:securePass
    }).then(user=>{
        const data={
           user:{
            id:user._id
           }
          
        }
        const authToken=jwt.sign(data,"king")
        success=true;
        res.json({success,authToken})   
    })
    .catch(err=>{
        console.log(err)
        res.json({meg:"enter unique value"})
    })
  } catch (error) {

    console.log(error)
  }
})


route.post("/login",[
    body('email',"wrong email").isEmail(),
    body('password',"fill it").exists()
],async(req,res)=>{
    let success=false;
    let errors =validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({success,error:errors.array()})
    }

    const {email,password}=req.body;
    try {
       const Use= await user.findOne({email})
        if(!Use){
            return res.status(400).json({success,error:"login failed"})
        }
        const pwdcom = await bcrypt.compare(password,Use.password);
        if(!pwdcom){
            return res.status(400).json({success,error:"login failed"})
        }
        let data={
            Use:{
                id:Use.id
            }
        }
        const authToken=jwt.sign(data,"king")
        success=true;
        res.json({success,authToken})
    } catch (error) {
        console.log(error)
        res.send("server error")
    }
})

module.exports=route;