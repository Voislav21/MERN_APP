const express = require('express');
const cors = require('cors');
require('dotenv').config({path: './config/.env'});
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models/index.models');

const app = express();

const corsOptions = {
    origin: 'https://localhost8081'
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

db.sequelize.sync()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`)
    });
});

app.get('/', (req,res) => {
    res.json( "Hello Mate good work")
});

const PORT = process.env.PORT || 8080

const userRoutes = require('./routes/user.routes');
app.use("/api", userRoutes);


