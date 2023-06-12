const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    institute: {type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    id:{type:String},
    
    entries:[{
        teacher:String,
        subject:String,
        class:String,
        maxi:Number,
        room:String
    }]
})
const User=mongoose.model('User',userSchema);
module.exports=User;