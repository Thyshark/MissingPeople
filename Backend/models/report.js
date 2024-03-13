const mongoose = require('mongoose');

// Define the schema for the report
const reportSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    lastKnownLocation: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String, // Assuming you store the image URL as a string
        required: true
    }
});

// Create the model using the schema
const ReportModel = mongoose.model('Report', reportSchema);

module.exports = ReportModel;
