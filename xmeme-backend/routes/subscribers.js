const express= require('express');
const router= express.Router();
const MemeDB= require('../models/memeDB');

// Middleware to get a single document from db
const getMeme= async (req, res, next) => {
    let meme;
    try{
        meme= await MemeDB.findById(req.params.id);
        // If document not found return 404
        if(meme==null){
            return res.status(404).json({message: "Cannot find the meme"});
        }
    } catch(err){
        // Server Error
        return res.status(500).json({message: err.message});
    }
    // Storing the document in res
    res.meme = meme;
    next();
};

// Getting All
router.get('/', async (req, res) => {
    try {
        // Get all documents from db & then only return first 100
        const all_memes= await MemeDB.find().sort( { date: -1 } );
        const memes= all_memes.slice(0, 100);
        res.json(memes);
    } catch (err){
        // Server Error
        res.status(500).json({message: err.message})
    }
});

// Getting One
router.get('/:id', getMeme, (req, res) => {
    res.json(res.meme);
});

// Creating One
router.post('/', async (req, res) => {
    // Creating a new document
    if(req.body.name===null || req.body.caption===null || req.body.url===null){
        return res.status(406).json({message: "Incorrect request body"});
    }
    const meme= new MemeDB({
        name: req.body.name,
        caption: req.body.caption,
        url: req.body.url
    })

    try {
        // Save the new document
        const newMeme= await meme.save();
        res.status(201).json(newMeme);
    } catch(err) {
        // Server Error
        res.status(500).json({message: err.message});
    }

});

//Updating One
router.patch('/:id', getMeme, async (req, res) => {
    // Finding the attributes to update
    if(req.body.name != null){
        return res.status(403).json({message: "Name cannot be updated"});
    }
    if(req.body.caption != null){
        res.meme.caption= req.body.caption;
    }
    if(req.body.imageURL != null){
        res.meme.imageURL= req.body.imageURL;
    }
    try {
        // Updating the document
        const updatedMeme= await res.meme.save();
        res.status(200).json(updatedMeme);
    } catch(err) {
        // Server Error
        res.status(500).json({message: err.message});
    }
});

module.exports= router;