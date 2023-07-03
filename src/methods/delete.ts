import { ServerResponse } from 'node:http';
import User from '../modules/interfaces';
import isValidUUID from '../modules/uuid-validater';
import returnData from '../modules/return-data';

export default function methodDelete(
  url: string,
  res: ServerResponse,
  users: User[],
) {
  const userId = url.split('/').pop();
  const isValid = /\/api\/users\/([^/]+)/.test(url);
  if (!isValid || !isValidUUID(userId)) {
    returnData(res, 'Invalid Data', 400);
    return;
  }

  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    returnData(res, 'User not found', 404);
  } else {
    users.splice(userIndex, 1);
    res.statusCode = 204;
    res.end();
  }
}
