const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const db = require('../models/index.models');
const User = db.user;

exports.signup = async (req,res,next) => {
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash
        };
        User.create(user)
        .then(() => {
            res.status(201).json({ message: 'User created!' });
        }).catch((error) => {
            res.status(401).json({ error: error });
        });
    });
};

// Login function //
exports.login = (req, res, next) => {
    // Check if user exists by looking in the database //
    // Input matching an email in the request.body //
    User.findOne({ where: {email: req.body.email} })
    // Returns a promise containing the user //
    .then((user) => {
        // Chack if we dont get a user back from the database //
        if(!user) {
            // 401 status, authentication error //
            return res.status(401).json({ message: 'User not found!' });
        }
        // If user exists compare the entered password with the hash in the database //
        bcrypt.compare(req.body.password, user.password)
        // Returns a promise the receives whether it is valid //
        .then((valid) => {
            // Check if it is not valid //
            if (!valid) {
                // 401 status, authentication error //
                return res.status(401).json({ message: 'Invalid Password!' });
            }
            // Create token varible to encode our data using the sign method which takes two arguments //
            const token = jwt.sign(
                { userId: user._id },
                // Development string //
                'RANDOM_TOKEN_SECRET',
                // Configuration object //
                { expiresIn: '24h' });
            // Successfully found user with valid password //
            res.status(200).json({
                // Send back to frontend that expects a json object with two fields //
                userId: user._id,
                token: token
            });
        })
        .catch((error) => {
            res.status(500).json({ error: error });
            console.log('something');
        });
    })
    .catch((error) => {
        res.status(500).json({ error: error });
        console.log('something');
    });
};