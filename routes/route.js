const express=require('express');
const router=express.Router();
const Diet=require('../models/diet');

const bodyParser=require('body-parser');

router.use(bodyParser.json()); // parses json data
router.use(bodyParser.urlencoded({extended:true})); // parses from data

// get end point to retrieve all blogs,sorted by data in descending order
router.get('/diet',async(req,res) => {
    try {
        const diets=await Diet.find();
        res.json(diets); // send the blogs as a JSON response
    } catch(error){
        res.status(500).json({message:error.message});
    }
});

// POST end point to create a new blog
router.post('/diet',async(req,res)=>{
    const diet=new Diet({
        dietplanname:req.body.dietplanname,
        mealtype:req.body.mealtype,
        fooditems:req.body.fooditems
    });

    try {
        const newDiet=await diet.save(); // save the new diet in the database
        res.status(201).json(newDiet); // send the created diet as a json response
    } catch(error){
        res.status(400).json({message:error.message}); // if an error occur,send a 400 response
    }
});

// PUT endpoint to update an existing blog by id
router.put('/diet/:id',async(req,res)=>{
    try {
        const updatedDiet=await Diet.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(updatedDiet); 
    } catch(error){
        res.status(400).json({message:error.message});
    }
});

//DELETE endpoint to delete an existing blog by id
router.delete('/diet/:id',async(req,res)=>{
    try {
        await Diet.findByIdAndDelete(req.params.id);
        res.json({message: 'Diet deleted'});
    } catch(error){
        res.status(500).json({message:error.message});
    }
});
module.exports=router;
