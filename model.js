const mongoose = require('mongoose');

const Schemas={
 userNotesSchema  :new mongoose.Schema({
    title:String,
    body:String,
    color:String,
    userId:String//In future when seperate user table is scaled up , taking input from user
}),
}

module.exports=Schemas;
