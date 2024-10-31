// swagger/schemas.js
const UserSchema = {
    type: 'object',
    required: ['name', 'email'],
    properties: {
        id: {
            type: 'string',
            description: 'Auto-generated user ID',
        },
        name: {
            type: 'string',
            description: 'User name',
        },
        email: {
            type: 'string',
            description: 'User email address',
        },
        deletedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time of deletion (for soft delete)',
        },
    },
    example: {
        id: '12345',
        name: 'Juan Pérez',
        email: 'juan@example.com',
        deletedAt: null,
    },
};

const ActivitySchema = {
    type: 'object',
    required: ['title', 'description', 'dueDate'],
    properties: {
        id: {
            type: 'string',
            description: 'Auto-generated activity ID',
        },
        title: {
            type: 'string',
            description: 'Title of the activity',
        },
        description: {
            type: 'string',
            description: 'Description of the activity',
        },
        dueDate: {
            type: 'string',
            format: 'date-time',
            description: 'Due date for the activity',
        },
        deletedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time of deletion (for soft delete)',
        },
    },
    example: {
        id: '67890',
        title: 'Complete project documentation',
        description: 'Finish writing the API documentation',
        dueDate: '2024-12-31T12:00:00Z',
        deletedAt: null,
    },
};

// Export Schema
module.exports = {
    User: UserSchema,
    Activity: ActivitySchema,
};
