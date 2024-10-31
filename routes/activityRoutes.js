const express = require('express');
const router = express.Router();
const Activity = require('../models/activity');
const { json } = require('body-parser');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /activities:
 *   post:
 *     summary: Create a new activity for a user
 *     tags: [Activities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user creating the activity
 *               title:
 *                 type: string
 *                 description: The title of the activity
 *               description:
 *                 type: string
 *                 description: A description of the activity
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: The due date for the activity
 *     responses:
 *       201:
 *         description: Successfully created activity
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       400:
 *         description: Invalid request body
 */
router.post('/', auth, async (req, res) => {

    
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

/**
 * @swagger
 * /activities:
 *   get:
 *     summary: Get all activities
 *     tags: [Activities]
 *     responses:
 *       200:
 *         description: A list of activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *       500:
 *         description: Server error
 */
router.get('/', auth, async (req, res) => {
    try {
        const activities = await Activity.find({ deletedAt: null });
        res.json(activities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /activities/{id}:
 *   get:
 *     summary: Get an activity by ID
 *     tags: [Activities]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the activity
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved activity
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       404:
 *         description: Activity not found
 *       500:
 *         description: Server error
 */
router.get('/:id',  auth, async (req, res) => {

    const idActivity = req.params.id;
    try {
        const activity = await Activity.find({ _id: idActivity, deletedAt: null});
        res.json(activity);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /activities/{id}:
 *   put:
 *     summary: Update an activity by ID
 *     tags: [Activities]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the activity to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the activity
 *               description:
 *                 type: string
 *                 description: The new description of the activity
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: The new due date for the activity
 *     responses:
 *       200:
 *         description: Successfully updated activity
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       404:
 *         description: Activity not found
 *       500:
 *         description: Server error
 */
router.put('/:id', auth, async (req, res) => {
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

/**
 * @swagger
 * /restore/{id}:
 *   put:
 *     summary: Restore a deleted activity
 *     tags: [Activities]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the activity to restore
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully restored the activity
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       404:
 *         description: Activity not found
 *       500:
 *         description: Server error
 */
router.put('/restore/:id', auth, async (req, res) => {
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

/**
 * @swagger
 * /activities/{id}:
 *   delete:
 *     summary: Delete an activity by ID (soft delete)
 *     tags: [Activities]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the activity to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Successfully deleted activity
 *       404:
 *         description: Activity not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, async (req, res) => {
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


module.exports = router;
