import foodModel from "../models/foodModel.js";

import fs from 'fs'

/// add food item
const addFood = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}


// all food list 
const listFood = async (req, res) => {
    try {
        const find = await foodModel.find({})
        res.json({ success: true, data: find })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}


// remove food item
const removeFood = async (req, res) => {
    try {
        const {id}=req.params;
        console.log(id)
        const find = await foodModel.findById(id)
        fs.unlink(`uploads/${find.image}`, () => { })  /// delete image from folder upload
        await foodModel.findByIdAndDelete(id);
        res.json({ success: true, message: 'food Removed' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' })
    }
}
export { addFood, listFood, removeFood }