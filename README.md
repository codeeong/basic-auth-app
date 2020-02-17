## Welcome To Codee Ong's Bambu Auth Challenge

### Instructions to Run Project:
1. Clone this project and install dependencies
```
cd basic-auth-app
npm install

```
2. Create databases in your local mysql db
``
create database bambuauthchallenge;
create database bambuauthchallengetest;
```
3. Go to /server/models/constants.js and change `USERNAME` and `PASSWORD` fields to your own db's credentials

4. Run server side - this will create the necessary tables and start up the server
```
node start.js
```
3. Run front end of project and find it at http://localhost:3000
```
npm run start
```

4. Run all tests - front + backend
```
npm test
```