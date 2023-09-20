const mongoose = require ("mongoose");
const {Schema,model} = mongoose;

const CartSchema = new Schema({

    userId : {type:String,require:true},
    articles : [],
    montant:{
        type:Number,
        default:0
    }
    
}); 


const Cart = model("Cart" , CartSchema);
module.exports = Cart;