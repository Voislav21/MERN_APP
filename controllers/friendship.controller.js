const { User: User } = require('../models/index.models');
const { Friendship: Friendship } = require ('../models/index.models');

exports.requestFriendship = async (req, res, next) => {
    try {
      const { userId, friendId } = req.params;
  
      // Check if both users exist
      const [user, friend] = await Promise.all([
        User.findByPk(userId),
        User.findByPk(friendId),
      ]);
  
      if (!user || !friend) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if the user is trying to befriend themselves
      if (user.id === friend.id) {
        return res.status(400).json({ error: 'You cannot befriend yourself' });
      }
  
      // Check if the friendship request already exists
      const existingRequest1 = await Friendship.findOne({
        where: {
          userId: user.id,
          friendId: friend.id,
          status: 'pending',
        },
      });

      // Check if the friendship request already exists (friend to user)
      const existingRequest2 = await Friendship.findOne({
      where: {
        userId: friend.id,
        friendId: user.id,
        status: 'pending',
      },
    });
  
      if (existingRequest1 || existingRequest2) {
        return res.status(400).json({ error: 'Friendship request already sent' });
      }
  
      // Create the friendship request
      await Friendship.create({
      userId: user.id,
      friendId: friend.id,
      status: 'pending',
    });
  
      res.status(201).json({ message: 'Friendship request sent successfully' });
    } catch (error) {
      console.error('Error sending friendship request:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };

exports.acceptFriendRequest = async (req, res, next) => {
  try {
    const { userId, friendId } = req.params;

    // Check if both users exist
    const [user, friend] = await Promise.all([
      User.findByPk(userId),
      User.findByPk(friendId),
    ]);

    if (!user || !friend) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the friendship request between the users
    const friendshipRequest = await Friendship.findOne({
      where: {
        userId: friend.id,
        friendId: user.id,
        status: 'pending',
      },
    });

    if (!friendshipRequest) {
      return res.status(404).json({ error: 'Friendship request not found' });
    }

    // Update the friendship status to 'accepted'
    friendshipRequest.status = 'accepted';
    await friendshipRequest.save();

    // Create the reciprocal friendship for the other user
    const reciprocalFriendship = await Friendship.create({
      userId: user.id,
      friendId: friend.id,
      status: 'accepted',
    });

    // Save the reciprocal friendship
    await reciprocalFriendship.save();

    res.status(200).json({ message: 'Friend request accepted' });
  } catch (error) {
    console.error('Error accepting friend request:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
  

