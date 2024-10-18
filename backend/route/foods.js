const express=require("express")
const route = express.Router()
const Order = require("../modules/Order")

route.post("/foodata",(req,res)=>{
    try {
        res.send([global.foodcat,global.fooditem])
    console.log();
    } catch (error) {
        console.log(error)
    }
    
})
route.post('/orderData', async (req, res) => {
    try {
        let data = req.body.order_data;
        let email = req.body.email;

        // Uncomment this if you want to add Order_date at the beginning of the order data
        data.unshift({ Order_date: req.body.order_date });

        console.log("Processing order for email:", email);

        let existingOrder = await Order.findOne({ email });

        if (existingOrder === null) {
            // No existing order, create a new one
            console.log("Creating new order:", data);
            await Order.create({
                email: email,
                order_data: [data]
            });
            res.json({ success: true });
        } else {
            // Existing order found, push new data
            console.log("Updating existing order for email:", email);
            await Order.findOneAndUpdate(
                { email: email },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.error("Error processing order:", error.message);
        res.status(500).json({ message: "Server Error: " + error.message });
    }
});

route.post("/myorder",async(req,res)=>{
    try {
        console.log(req.body.email);
        let eid = await Order.findOne({"email":req.body.email})
        res.json({orderData:eid})
    } catch (error) {
        console.log(error)
    }
})

module.exports=route