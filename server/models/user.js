const mongoose=require('mongoose');
const { stringify } = require('nodemon/lib/utils');

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
    }],
    fixed:[
    {
        day:String,
        teacher:String,
        subject:String,
        class:String,
        room:String,
        timeslot:String
    }
    ],
    pairing:[{
        teacher:String,
        subject:String,
        class1:String,
        class2:String,
        class3:String
    }]
})
const User=mongoose.model('User',userSchema);
module.exports=User;