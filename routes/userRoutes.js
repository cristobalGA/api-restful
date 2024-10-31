const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User' 
 *       500:
 *         description: Server error
 */
router.get('/', auth, async (req, res) => {
   try {
      const users = await User.find();
      res.json(users);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User' 
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/:id', auth, async (req, res) => {

    const userid = req.params.id;
    try {
        const user = await User.find({ _id: userid, deletedAt: null});
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID (soft delete)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Successfully deleted user
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, async (req, res) => {
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