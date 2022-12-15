const { Schema } = require('mongoose');

const platformSchema = new Schema({
    platformId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = platformSchema;