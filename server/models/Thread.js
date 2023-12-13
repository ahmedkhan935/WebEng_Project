const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    content: {
        type: [
            {
                content: {
                    type: String,
                    required: true
                },
                date: {
                    type: Date,
                    required: true
                },
                createdBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                }
            }
        ]
    },

});