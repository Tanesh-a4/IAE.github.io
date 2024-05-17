const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'editor'],  // Available roles
        default: 'user',
        required: false  // Role is not crucial, but if provided, it must be one of the specified values.
    },
    foodPreferences: [String],  // List of preferred foods
    restaurantPreferences: [String],  // List of preferred restaurants
    foodPercentages: {
        type: [Number],
        validate: [percentArrayValidator, 'Food percentages must sum to 100 or be empty']
    },
    restaurantPercentages: {
        type: [Number],
        validate: [percentArrayValidator, 'Restaurant percentages must sum to 100 or be empty']
    }
});

// Validator function to check if percentages array sums to 100
function percentArrayValidator(value) {
    const sum = value.reduce((acc, curr) => acc + curr, 0);
    return sum === 100 || sum === 0;  // Allowing 0 sum to support empty array cases
}

const User = mongoose.model('User', userSchema);

module.exports = User;
