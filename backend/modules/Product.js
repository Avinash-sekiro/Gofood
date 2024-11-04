const mongoose = require("mongoose")
const {Schema} = mongoose

const Products = new Schema({
    categoryname: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    option: {
        half: {
            type: Number,
            required: true
        },
        full: {
            type: Number,
            required: true
        }
    }
});


module.exports=mongoose.model("prouct",Products)