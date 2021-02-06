require('dotenv').config();
const express= require('express');
const mongoose= require('mongoose');
const cors = require('cors');

const app= express();

const PORT= process.env.PORT || 8081;

app.use(cors());

// DataBase Connection
mongoose.connect(process.env.DATABASE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db= mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

//Routes
const subscribersRouter= require('./routes/subscribers');
app.use('/memes', subscribersRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));