const http = require('http');
const app = require('express')();

const configDetails = require('./config').configDetails;
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ********** Controller Variables ***********
const userController = require('./Controller/userDetails.controller').userDetails;
const accessController = require('./Controller/accessToken.controller').accessDetails;
const userLanguageController = require('./Controller/userLanguage.controller').userLanguageDetails;

const server = http.createServer(app);

// Agora aiding middleware
const nocache = (req, resp, next) => {
  resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  resp.header('Expires', '-1');
  resp.header('Pragma', 'no-cache');
  next();
};

// *********** Post Requests ************
app.post('/saveUserDetails',userController.saveUserDetails);
app.post('/login',userController.userLogin);
app.post('/addLanguages',userLanguageController.addLanguages);

// *********** Get Requests ************
app.get('/fetchDetails/start/:start/end/:end',userController.fetchUserDetails);
app.get('/access_token/channel/:channelName/role/:role', nocache, accessController.getAccessToken);

server.listen(configDetails.environmentDetails.port, configDetails.environmentDetails.hostName, () => {
  console.log(`Server running at http://${configDetails.environmentDetails.hostName}:${configDetails.environmentDetails.port}/`);
});