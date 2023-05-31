const express = require('express');
const cors = require('cors');
require('dotenv').config({path: './config/.env'});
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models/index');

const app = express();

const corsOptions = {
    origin: 'https://localhost8081'
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

(async () => {
    await db.sequelize.sync();
    console.log('Connected successfully to MySQL!');
})();

app.get('/', (req,res) => {
    res.json({ message: "Hello Mate good work"})
});

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});
