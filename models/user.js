const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: Autogenerated user ID
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           description: User's email address
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Deletion timestamp (for soft delete)
 *       example:
 *         id: 12345
 *         name: John Doe
 *         email: john@example.com
 *         deletedAt: null
 */
const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   updatedAt: {
    type: Date,
    default: Date.now,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
});

// Hashing password before saving user
UserSchema.pre('save', async function(next) {
   if (!this.isModified('password')) return next();
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
});

// Method to compare passwords during login
UserSchema.methods.comparePassword = function(candidatePassword) {
   return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);