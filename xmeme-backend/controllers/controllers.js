const MemeDB = require('../models/memeDB');
const ObjectID = require('mongodb').ObjectID;

// Middleware to get a single document from db
exports.getMeme = async (req, res, next) => {
	if (!ObjectID.isValid(req.params.id)) {
		return res.status(404).json({ message: 'Meme not found' });
	}
	let meme;
	try {
		meme = await MemeDB.findById(req.params.id);
		// If document not found return 404
		if (meme == null) {
			return res.status(404).json({ message: 'Meme not found' });
		}
	} catch (err) {
		// Server Error
		return res.status(500).json({ message: err.message });
	}
	// Storing the document in res
	res.meme = meme;
	next();
};

exports.getMemes = async (req, res) => {
	try {
		// Get all documents from db & then only return first 100
		const all_memes = await MemeDB.find().sort({ date: -1 });
		const temp_memes = await all_memes.slice(0, 100);
		const memes = await temp_memes.map((curr) => {
			return {
				id: curr._id,
				name: curr.name,
				url: curr.url,
				caption: curr.caption,
				date: curr.date,
			};
		});
		res.status(200).json(memes);
	} catch (err) {
		// Server Error
		res.status(500).json({ message: err.message });
	}
};

exports.getMemeById = (req, res) => {
	let result = {
		id: res.meme._id,
		name: res.meme.name,
		url: res.meme.url,
		caption: res.meme.caption,
		date: res.meme.date,
	};
	res.status(200).json(result);
};

exports.postMeme = async (req, res) => {
	// Checking for invalid data
	if (!req.body.name || !req.body.caption || !req.body.url) {
		return res.status(406).json({ message: 'Not Acceptable' });
	}

	const meme = new MemeDB({
		name: req.body.name,
		caption: req.body.caption,
		url: req.body.url,
	});

	try {
		// Searching the db for dublicate document
		MemeDB.findOne({
			name: meme.name,
			caption: meme.caption,
			url: meme.url,
		})
			.then(async (result) => {
				if (result != null) {
					return res.status(409).json({ message: 'Conflict' });
				}
				// Saving the new document if no conflict found
				const newMeme = await meme.save();
				return res.status(201).json({ id: newMeme._id });
			})
			.catch((err) => console.log(err));
	} catch (err) {
		// Server Error
		res.status(500).json({ message: err.message });
	}
};

exports.updateMeme = async (req, res) => {
	// Finding the attributes to update
	if (req.body.name != null) {
		return res.status(403).json({ message: 'Name cannot be updated' });
	}
	if (req.body.caption != null) {
		res.meme.caption = req.body.caption;
	}
	if (req.body.url != null) {
		res.meme.url = req.body.url;
	}
	try {
		// Updating the document
		MemeDB.replaceOne(
			{ _id: req.params.id },
			{ caption: req.body.caption }
		);
		res.meme.save().then(() => {
			res.status(200);
			res.end();
		});
	} catch (err) {
		// Server Error
		res.status(500).json({ message: err.message });
	}
};
