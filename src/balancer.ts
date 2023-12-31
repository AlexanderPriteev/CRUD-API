import cluster, { Worker } from 'node:cluster';
import { env } from 'node:process';
import { availableParallelism } from 'node:os';
import dotenv from 'dotenv';
import User from './modules/interfaces';
import serverCreate from './main';

dotenv.config();
const port = Number(env.PORT || 4000);

const numWorkers = availableParallelism();

if (cluster.isPrimary) {
  const workers: Worker[] = [];
  for (let i = 0; i < numWorkers - 1; i++) {
    workers.push(cluster.fork());
  }

  workers.forEach((worker) => {
    worker.on('message', (message: string | object) => {
      if (typeof message === 'string') {
        workers.forEach((e) => e.send(message));
      }
    });
  });
} else {
  const currentPort = port + (cluster.worker?.id || 1) - 1;
  const users: User[] = [];
  cluster.worker?.on('message', (message: string | object) => {
    if (typeof message === 'string') {
      const parsedUsers = JSON.parse(message) as User[];
      users.length = 0;
      Array.prototype.push.apply(users, parsedUsers);
    }
  });

  serverCreate(currentPort, users, cluster.worker);
}
