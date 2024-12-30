const mongoose=require('mongoose');

// define a schema for the blog using mongoose
const dietSchema=new mongoose.Schema({
    dietplanname:{type:String,required:true},
    mealtype:{type:String,required:true},
    fooditems:{type:String,required:true},
});
module.exports=mongoose.model('Diet',dietSchema);