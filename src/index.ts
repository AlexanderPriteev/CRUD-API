import dotenv from "dotenv";
import {env} from "node:process";
import User from "./modules/interfaces";
import serverCreate from "./main";

dotenv.config();

const port =  Number(env.PORT || 4000);
const users: User[] = [];
serverCreate(port, users);