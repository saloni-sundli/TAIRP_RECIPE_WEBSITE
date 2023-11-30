const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Recipe = require('./model/recipe')

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

//Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/recipes');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.post('/api/recipe', async (req, res) => {
    try{
        const{
            name,
            imageUrl,
            description,
            author,
            ingredients,
            method,
        } = req.body;

        const newRecipe = new Recipe({
            name,
            imageUrl,
            description,
            author,
            ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
            method,
        })
        await newRecipe.save();
        res.status(201).json(newRecipe)
    } 
    catch(error){
        res.status(500).send("Error adding recipe")
    }
});

app.get('/api/recipe', async(req, res) => {
    try{
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    }
    catch(error){
        res.status(500).json({error: 'Error getting recipes'})
    }
});

app.delete('/api/recipe/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const recipes = await Recipe.findByIdAndDelete(id);
        if(recipes){
            res.status(200).json(recipes);
        }else{
            res.status(404).json(recipes);
        }
    } catch (error) {
        res.status(500).json({error: 'Error deleting recipes'})
    }
});

app.put('/api/recipe/:id', async(req, res) => {
        const id = req.params.id;
        const {name,
            imageUrl,
            description,
            author,
            ingredients,
            method} = req.body;

            const updateField = {};

            if(name) updateField.name = name;
if(imageUrl) updateField.imageUrl = imageUrl;
if(description) updateField.description = description;
if(author) updateField.author = author;
if(ingredients) updateField.ingredients = ingredients.split(',').map(ingredient => ingredient.trim())
if(method) updateField.method = method;

    try {
        const recipes = await Recipe.findByIdAndUpdate(id, updateField, {new: true});
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({error: 'Error updating recipes'})
    }
})

app.listen(PORT ,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
})