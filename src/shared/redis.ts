import { SetOptions, createClient } from 'redis';
import { config } from '../config';
import { errorLogger, infoLogger } from './logger';

const redisclient = createClient({
  url: config.redis.url,
});

const redisPubClient = createClient({
  url: config.redis.url,
});

const redisSubClient = createClient({
  url: config.redis.url,
});

redisclient.on('error', err => errorLogger.error('RedisError:', err));
redisclient.on('connect', () => infoLogger.info('Redis Connected'));
const connect = async (): Promise<void> => {
  await redisclient.connect();
  await redisPubClient.connect();
  await redisSubClient.connect();
};

const set = async (
  key: string,
  value: string,
  options?: SetOptions,
): Promise<void> => {
  await redisclient.set(key, value, options);
};

const get = async (key: string): Promise<string | null> => {
  return await redisclient.get(key);
};

const del = async (key: string): Promise<void> => {
  await redisclient.del(key);
};

const disconnect = async (): Promise<void> => {
  await redisclient.quit();
  await redisPubClient.quit();
  await redisSubClient.quit();
};

const setAccessToken = async (userId: string, token: string): Promise<void> => {
  const key = `access-token:${userId}`;
  await redisclient.set(key, token, { EX: Number(config.redis.expires_in) });
};

const getAccessToken = async (userId: string): Promise<string | null> => {
  const key = `access-token:${userId}`;
  return await redisclient.get(key);
};

const delAccessToken = async (userId: string): Promise<void> => {
  const key = `access-token:${userId}`;
  await redisclient.del(key);
};

export const RedisClient = {
  connect,
  set,
  get,
  del,
  disconnect,
  setAccessToken,
  getAccessToken,
  delAccessToken,
  publish: redisclient.publish.bind(redisPubClient),
  subscribe: redisclient.subscribe.bind(redisSubClient),
};
