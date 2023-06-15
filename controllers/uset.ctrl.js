const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const { User: User } = require('../models/index.models');


exports.signup = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({firstName, lastName, email, password: hashedPassword });
        res.status(201).json({ User: user });
    }
    catch(error) {
        res.status(401).json({ message: 'problem'});
    }
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

exports.getAllUsers = async (req, res, next) => {
    try {
      const users = await User.findAll({ attributes: { exclude: ['password'] } });
      res.status(200).json(users);
    } catch (error) {
      // Handle the error appropriately
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.getUserInfo = async (req, res, next) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      // Handle the error appropriately
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.getFriendsList = async (req, res, next) => {
    try {
      const { userId } = req.params;
  
      // Find the user by their ID
      const user = await User.findByPk(userId, {
        include: { 
          model: User, 
          as: 'friends', 
          through: { 
            where: { status: 'accepted' },
          },
         },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Retrieve the friends list
      const friends = user.friends;
  
      res.status(200).json({ friends });
    } catch (error) {
      console.error('Error retrieving friends list:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  