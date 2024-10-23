const express = require('express');
const router = express.Router();
const Activity = require('../models/activity');
const { json } = require('body-parser');

//CREATE Activity User
router.post('/', async (req, res) => {

    
    const { userId, title, description, dueDate} = req.body;

    const activity = new Activity({
        title,
        description,
        dueDate,
        user:userId,
    })

    try {
        const savedActivity = await activity.save();
        res.status(201).json(savedActivity);
    } catch (error) {
        res.status(400).json({message:error.message})
    }

});

//GET All Activitis
router.get('/', async (req, res) => {
    try {
        const activities = await Activity.find({ deletedAt: null });
        res.json(activities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Get activity by Id
router.get('/:id', async (req, res) => {

    const idActivity = req.params.id;
    try {
        const activity = await Activity.find({ _id: idActivity, deletedAt: null});
        res.json(activity);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//PUT Activity by User
router.put('/:id', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        
        // Update the document and check the updatedAt
        activity.set(req.body); // Set the new values
        await activity.save(); // Save the document

        res.json(activity); // Return the updated activity 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }   
});

// Delete activity by id
router.delete('/:id', async (req, res) => {
    try {
        // Search the activity by id 
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }

        // Set deleteAt to the current datetime 
        activity.deletedAt = Date.now();
        await activity.save(); // Save the updated document 

        res.status(204).send(); // Return a state of 204 not content 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/restore/:id', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }

        // Restore deleted activity
        activity.deletedAt = null;
        await activity.save(); // Save the updated document

        res.json(activity); // Return the restored activity 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
