import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL;

let redis = null;

if (redisUrl) {
  redis = new Redis(redisUrl);

  redis.on("connect", () => {
    console.log("✅ Redis connected");
  });

  redis.on("error", (err) => {
    console.error("Redis error:", err);
  });
} else {
  console.warn("⚠️ Redis disabled (REDIS_URL not set)");
}

export default redis;
