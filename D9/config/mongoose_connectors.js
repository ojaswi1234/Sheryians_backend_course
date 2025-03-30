const mongoose = require("mongoose");
const debug = require("debug")("development:mongoose");

const config = require("config");

mongoose.connect(`${config.get("MONGO_URI")}/scratch`, {useNewUrlParser: true, useUnifiedTopology: true}).then(
    function(){
        debug("MongoDB connected successfully");
    }
).catch(function(err){
    debug("MongoDB connection error: ", err);
    process.exit(1);
})

module.exports = mongoose.connection;