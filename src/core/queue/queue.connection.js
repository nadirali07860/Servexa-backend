const IORedis = require("ioredis");

let connection = null;

if (process.env.REDIS_URL) {

  connection = new IORedis(process.env.REDIS_URL);

  connection.on("connect", () => {
    console.log("✅ Queue Redis connected");
  });

  connection.on("error", (err) => {
    console.error("Queue Redis error:", err.message);
  });

} else {

  console.warn("⚠️ Queue Redis disabled");

}

module.exports = connection;
