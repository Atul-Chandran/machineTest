const http = require('http');
const app = require('express')();
const configDetails = require('./config').configDetails;
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ********** Controller Variables ***********
const userController = require('./Controller/userDetails.controller').userDetails;

const server = http.createServer(app);

// *********** Post Requests ************
app.post('/saveUserDetails',userController.saveUserDetails);
app.post('/login',userController.userLogin);

// *********** Get Requests ************
app.get('/fetchDetails/user/:userEmail/start/:start/end/:end',userController.fetchUserDetails);

server.listen(configDetails.environmentDetails.port, configDetails.environmentDetails.hostName, () => {
  console.log(`Server running at http://localhost:3002/`);
});