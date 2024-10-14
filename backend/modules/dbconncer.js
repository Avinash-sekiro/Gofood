const mongoose = require('mongoose');
const url = 'mongodb+srv://gofood:king@cluster0.06iwc.mongodb.net/gofood?retryWrites=true&w=majority';

const connectToDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to the database');
        const dt = await mongoose.connection.db.collection('foodata').find({}).toArray();
        global.fooditem=dt;
        const dc=await mongoose.connection.db.collection("category").find({}).toArray();
        global.foodcat=dc;
        console.log()
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

module.exports = connectToDB;
