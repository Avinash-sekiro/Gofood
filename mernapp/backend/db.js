const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://akashbondrock777:mern123@cluster0.shephy4.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Fetch food items
    const foodItemsCollection = mongoose.connection.db.collection("fooditems");
    const foodItemsData = await foodItemsCollection.find({}).toArray();

    // Fetch food categories
    const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();

    // Set to global
    global.food_items = foodItemsData;
    global.foodCategory = foodCategoryData;

    console.log("✅ Global data loaded: food_items and foodCategory");
    

  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
};

module.exports = mongoDB;
