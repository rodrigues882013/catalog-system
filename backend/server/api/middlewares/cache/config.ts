import Redis from 'ioredis'

const config = {
    port: process.env.CACHE_PORT,
    host: process.env.CACHE_HOST,
    family: 4,
    db: process.env.CACHE_DATABASE
};
const redis = new Redis(config);
export default redis;


