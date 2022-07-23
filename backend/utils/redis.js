import redis from "redis";
import CONFIG from "../../config.js";

export const client = redis.createClient({
  url: `redis://${CONFIG.redis.host}:${CONFIG.redis.port}`,
});

(async () => {
  await client.connect();
  client.on("error", (err) => {
    console.log(err);
  });
})();
