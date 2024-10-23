const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    dueDate: {
        type: Date,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

});

ActivitySchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

ActivitySchema.pre('updateOne', function(next) {
    this.set({ updatedAt: Date.now() });
    next();
});

ActivitySchema.pre('updateMany', function(next) {
    this.set({ updatedAt: Date.now() });
    next();
});

module.exports = mongoose.model('Activity', ActivitySchema);