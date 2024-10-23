const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users
router.get('/', async (req, res) => {
   try {
      const users = await User.find();
      res.json(users);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});

//Get user by Id
router.get('/:id', async (req, res) => {

    const userid = req.params.id;
    try {
        const user = await User.find({ _id: userid, deletedAt: null});
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new user
router.post('/', async (req, res) => {
   const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
   });
   try {
      const newUser = await user.save();
      res.status(201).json(newUser);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
});

// Delete activity by id
router.delete('/:id', async (req, res) => {
    try {
        // Search the activity by id 
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }

        // Set deleteAt to the current datetime 
        user.deletedAt = Date.now();
        await user.save(); // Save the updated document 

        res.status(204).send(); // Return a state of 204 not content 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;