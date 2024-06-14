const mongoose = require('mongoose');

const databaseConnection = () => {
    const connectWithRetry = () => {
        console.log('Attempting MongoDB connection...');
        mongoose.connect(process.env.DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: true
        }).then((data) => {
            console.log(`Database connected successfully at server ${data.connection.host}`);
        }).catch((err) => {
            console.error(`MongoDB connection error: ${err.message}`);
            console.log('Retrying MongoDB connection in 5 seconds...');
            setTimeout(connectWithRetry, 5000);
        });
    };

    connectWithRetry();
};

module.exports = databaseConnection;
