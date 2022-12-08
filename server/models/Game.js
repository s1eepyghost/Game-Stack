const { Schema } = require('mongoose');

const gameSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    platforms: [
        {
            type: String,
        }
    ],
    description: {
        type: String,
        required: true,
    },
    gameId: {
        type: Number,
        required: true,
    },
    image: {
        type: String
    }
});

module.exports = gameSchema;
