require('dotenv').config({ path: './.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerInfo = require('./swaggerInfo.json');

const app = express();
const swaggerApp = express();

const PORT = process.env.PORT || 8081;
const swaggerPort = 8080;

app.use(cors());
swaggerApp.use(cors());

// DataBase Connection
mongoose.connect(process.env.DATABASE_URL, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

// Configuring swagger
const swaggerOptions = {
	swaggerDefinition: swaggerInfo,
	apis: ['index.js'],
};

// Using the swagger config
const swaggerDocs = swaggerJsDoc(swaggerOptions);
swaggerApp.use('/swagger-ui', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Cheking for bad request
app.use((err, req, res, next) => {
	if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
		return res.status(400).send({ message: 'Invalid request body' }); // Bad request
	}
	next();
});

// Routes
const subscribersRouter = require('./routes/subscribers');
app.use('/memes', subscribersRouter);

// Swagger app
swaggerApp.listen(swaggerPort, () =>
	console.log(`Swagger app running on port ${swaggerPort}`)
);

// API server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
