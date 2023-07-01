import http, { IncomingMessage, ServerResponse } from 'node:http';
import dotenv from 'dotenv';
import { env } from 'node:process'
import User from "./modules/interfaces";
import returnData from "./modules/return-data";
import methodGet from "./methods/get";
import methodPost from "./methods/post";
import methodPut from "./methods/put";
import methodDelete from "./methods/delete";

dotenv.config();

const port = env.PORT || 4000;
const users: User[] = [];

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req;
    if(typeof url !== 'string'){
        returnData(res, 'Invalid Data', 400);
        return;
    }

    switch (method) {
        case 'GET':
            methodGet(url, res, users);
            break;
        case 'POST':
            methodPost(url, req, res, users);
            break;
        case 'PUT':
            methodPut(url, req, res, users);
            break;
        case 'DELETE':
            methodDelete(url, res, users);
            break;
        default:
            returnData(res, 'Endpoint not found', 404);
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});