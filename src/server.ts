/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import { config } from './config';
import { infoLogger } from './shared/logger';
import { RedisClient } from './shared/redis';

let server: Server;

process.on('uncaughtException', error => {
  console.log('uncaught exception is dectected', error);
  process.exit(1);
});

async function dbConnect() {
  try {
    await RedisClient.connect();
    await mongoose.connect(config.database_url as string);
    infoLogger.info('Database Connected');
    server = app.listen(config.port, () => {
      infoLogger.info('Server Running On Port', config.port);
    });
  } catch (error) {
    console.log('Failed To Connect Database');
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
dbConnect();

process.on('SIGTERM', () => {
  infoLogger.info('Sigterm is received');
  if (server) {
    server.close();
  }
});
