var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var UserSchema=new Schema({
    name:String,
    email:String,
    number:Number,
    books:[{type: Schema.Types.ObjectId, ref:'book'}]
});
module.exports=mongoose.model('user',UserSchema);