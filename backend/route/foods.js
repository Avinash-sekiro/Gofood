const express=require("express")
const route = express.Router()

route.post("/foodata",(req,res)=>{
    try {
        res.send([global.foodcat,global.fooditem])
    console.log();
    } catch (error) {
        console.log(error)
    }
    
})

module.exports=route