import NodeCache from "node-cache";

const weatherCache = new NodeCache({ stdTTL: 300 }); // 5 minutes TTL

export { weatherCache };
