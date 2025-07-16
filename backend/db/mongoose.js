
const mongoose = require('mongoose');
require('dotenv').config();

async function connectDb() {

    try {

        await mongoose.connect(process.env.MONGO_URL , {
            dbName: 'hospital-management'
        });

        console.log("Moongoose connected")

    } catch (err) {
        console.error("Error to connect database", err.message)
    }

}


module.exports = {connectDb}
