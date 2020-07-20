const mongoose = require('mongoose');


module.exports = () => {
    mongoose.connect(
        process.env["DB_STRING"],
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }

    );

    mongoose.connection.on('open', () => {
        console.log("MongoDB Is Online!");
    });

    mongoose.connection.on('error', (err) => {
        console.log("MongoDB Is Not Connected!!!",err);
    });
}
