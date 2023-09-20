const mongoose = require ("mongoose");
const {Schema,model} = mongoose;
const userSchema = new Schema({
    nom:{type:String ,required:true},
    prenom:{type:String , required:true},
    email:{type:String , required:true , unique:true},
    telephone:{type:String , required:true},
    motDepass:{type:String , required:true},
    
});


const User = model("User" , userSchema);
module.exports = User;