## Welcome To Codee Ong's Bambu Auth Challenge

### This project in build with:
#### - React front-end interface
#### - Node-ExpressJS back-end server
#### - MySQL database
#### - Implemented with some basic front and backend tests on critical functionality.

### Instructions to Run Project:
1. Clone this project and install dependencies
```
git clone https://github.com/codeeong/basic-auth-app.git
cd basic-auth-app
npm install
```

2. Create databases in your local mysql db shell:
```
create database bambuauthchallenge;
create database bambuauthchallengetest;
```

3. Go to `/server/models/config.js` and change `USERNAME` and `PASSWORD` fields to your own db's credentials

4. Run server side - this will create the necessary tables and start up the server
```
cd server
node start.js
```

3. Run front end of project in a new shell tab from project root and find it at http://localhost:3000
```
npm run start
```

4. Run all tests on project root - front + backend
```
npm test
```