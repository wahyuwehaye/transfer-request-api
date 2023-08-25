const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/transfer_management', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.error('Connection to MongoDB failed:', err);
        process.exit(1); // Exit process with a failure code
    }
};

module.exports = connectDB;
