const { MongoClient } = require('mongodb');

// Replace with your actual connection string
const uri ='mongodb+srv://akashbondrock777:mern123@cluster0.shephy4.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';

// Create a new MongoClient
const client = new MongoClient(uri);

async function testConnection() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas!");

    // Optional: list the databases
    const databasesList = await client.db().admin().listDatabases();
    console.log("📂 Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  } finally {
    await client.close();
  }
}

testConnection();
