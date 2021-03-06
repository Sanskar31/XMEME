const express = require('express');
const router = express.Router();

// Importing Controllers
const controllers = require('../controllers/controllers.js');

// Getting All
router.get('/', controllers.getMemes);

// Getting One
router.get('/:id', controllers.getMeme, controllers.getMemeById);

// Creating One
router.post('/', controllers.postMeme);

//Updating One
router.patch('/:id', controllers.getMeme, controllers.updateMeme);

module.exports = router;
