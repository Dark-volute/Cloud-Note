const Redis = require("redis");
const redis = Redis.createClient({
    host:'127.0.0.1',
    port:6379,
});
 

 
redis.on("error", function (err) {
    console.log("Error " + err);
});

module.exports = redis