import { createClient } from "redis";

const redisClient = createClient();
redisClient.on("error", (err) => console.log("Redis client error", err));

try {
    redisClient.connect();
} catch (error) {
    console.error("Redis connection failed", error);
}

export default redisClient;
