const req = require("express/lib/request");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "please enter product name"]
    },
    description:{
        type:String,
        required:[true, "please enter the description of product"]
    },
    price:{
        type:Number,
        required:true
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
      url:{
          type:String,
          required:true
        }
    }],

    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        default:1
    },
    numberReview:{
        type:Number,
        default:0
    },
    reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
        },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String
            }
        }],
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
        },
        createdAt:{
            type:Date,
            default:Date.now()
        }
})


module.exports = mongoose.model("product", productSchema);