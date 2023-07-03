# CRUD-API
## Installation
1. Download this repository.
2. Install dependencies by running the command `npm install`.

## Running
- Development mode: `npm run start` or `npm run start:dev`
- Production mode: `npm run start:prod`
- Multi-threaded mode: `npm run start:multi`
- Running tests: `npm run test` (quiet mode) or `npm run test:verbose`

## Endpoints
- `GET api/users` - Get all users it in the database.
- `GET api/users/{userId}` - Get an existing user it in the database.
- `POST api/users` - Create a new user record and store it in the database.
- `PUT api/users/{userId}` - Update an existing user it in the database.
- `DELETE api/users/{userId}` - Delete an existing user from the database.

**Note:**
1. By default, the base URL for each endpoint is `http://localhost:4000/` (you can configure the port in the `.env` file). For example, `http://localhost:4000/api/users`.
2. The `userId` is generated using UUID v4.