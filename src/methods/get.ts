import {ServerResponse} from "node:http";
import User from "../modules/interfaces";
import isValidUUID from "../modules/uuid-validater";
import returnData from "../modules/return-data";


export default function methodGet(url: string, res: ServerResponse, users: User[]){
    if (url === '/api/users') {
        returnData(res, users, 200);
    }
    else {
        const userId = url.split('/').pop();
        const user = users.find((u) => u.id === userId);
        const isValid = /\/api\/users\/([^/]+)/.test(url)

        if (!isValid || !isValidUUID(userId)) {
            returnData(res, 'Invalid Data', 400);
        } else if (!user) {
            returnData(res, 'User not found', 404);
        } else{
            returnData(res, user, 200);
        }
    }
}