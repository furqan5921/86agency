const mongoose = require('mongoose');

const connection = () => {
    try {
        console.log("Db is connected")
        return mongoose.connect(process.env.DB_URL)
    } catch (e) {
        console.log(e.message)
    }
}

module.exports = connection