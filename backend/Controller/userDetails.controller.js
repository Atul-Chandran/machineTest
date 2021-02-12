// Importing built in modules
const MongoClient = require('mongodb').MongoClient;
const moment = require('moment');
const md5 = require('md5');

// Importing code fragments
const configurationDetails = require('../config').configDetails;
const dbConfigDetails = configurationDetails.databaseDetails;
const collectionName = "users";

// Service function
const mailServiceFunction = require('../Services/sendMail.service').sendMail;

// Saves user related details in "users" collection
function saveUserDetails(request,response){
    requestMessage = request.body;
    response.setHeader('Content-Type', 'application/json');

    // If details in the request body has been passed
    if(Object.keys(requestMessage).length > 0){

        // Details which will be required for user creation
        name = requestMessage.name;
        email = requestMessage.email;
        password = String(requestMessage.password);
        phoneNumber = requestMessage.phoneNumber;
        gender = requestMessage.gender;
        place = requestMessage.place;
        profession = requestMessage.profession;

            // Verifying if the username or email entered by the user already exists in the database
            MongoClient.connect(dbConfigDetails.mongoDBUrl, function(err, db) {
            var dbo = db.db(dbConfigDetails.dbName);
            var query = {
                $or: [
                    {
                        email: email
                    },
                    {
                        name: name
                    }
                ]
            }
            dbo.collection(collectionName).find(
                query,
                {
                    projection: {
                        "_id": 1
                    }
                }
            ).toArray(async function(err, result) {

                // If email or name does not exist in the database, create an entry
                if(result.length === 0){
                    dbo.collection(collectionName).insertOne(
                        {
                            name: name,
                            email: email,
                            password: md5(password),
                            phoneNumber: phoneNumber,
                            languages: [],
                            gender: gender,
                            place: place,
                            profession: profession,
                            created: moment().format(),
                            modified: moment().format()
                        }, 
                        function(err, res) {
                        if (err) {
                            response.json({
                                status: 400,
                                message: "An error occured while saving user details"
                            })
                        }
                        else{
                            // Sending a success response mail to the user
                            var isMailSentSuccessful = mailServiceFunction(
                                email,
                                "Login Successful",
                                "<h1> Login Successful!! Congrats </h1>"
                            );

                            if(isMailSentSuccessful){
                                response.json({
                                    status: 200,
                                    message: "Data succesfully added and mail sent successfully",  
                                });
                            }
                            else{
                                response.json({
                                    status: 400,
                                    message: "Data successfully added but error occured while sending mail",  
                                });
                            }
                        }
                        db.close();
                    });
                }
                else{
                    response.json({
                        status: 400,
                        message: "Sorry!! This user has been taken"
                    })
                }
            })
        });
    }

    else{
        response.json({
            status: 403,
            message: "Invalid details"
        })
    }
}

// Authenticates the user details
function userLogin(request,response){
    requestMessage = request.body;
    
    if(Object.keys(requestMessage).length > 0){
        email = requestMessage.email;
        password = String(requestMessage.password);

        MongoClient.connect(dbConfigDetails.mongoDBUrl, function(err, db) {
            var dbo = db.db(dbConfigDetails.dbName);
            var query = {
                email: email,
                password: md5(password)
            }
            dbo.collection(collectionName).findOne(
                query,
                {
                    projection: {
                        "_id": 1,
                        "email": 1
                    }
                },
                function(err, result) {
                    if(err) {
                        response.json({
                            status: 403,
                            message: "Error occured while fetching details"
                        })
                    }
                    else{
                        if(result){
                            response.json({
                                status: 200,
                                message: "Login successful"
                            })
                        }
                        else{
                            response.json({
                                status: 403,
                                message: "Invalid user details"
                            })
                        }
                    }
                }
            )
        });
    }
    else{
        response.json({
            status: 403,
            message: "Invalid details"
        })
    }
}

// Fetches user details
function fetchUserDetails(request,response){
    const requestParamters = request.params;

    // Limit parameters for pagination
    var startLimit = parseInt(requestParamters["start"]);
    var endLimit = parseInt(requestParamters["end"]);
    try{
        // If a valid integer has been passed for start and end limit
        if(!isNaN(startLimit) && !isNaN(endLimit)){

            // Limit parameters for pagination
            startLimit = parseInt(requestParamters["start"]);
            endLimit = parseInt(requestParamters["end"]);

            MongoClient.connect(dbConfigDetails.mongoDBUrl, function(err, db) {
                var dbo = db.db(dbConfigDetails.dbName);
                dbo.collection(collectionName).findOne(
                    {},
                    {
                        projection: {
                            "_id": 1,
                        }
                    },
                    function(err, result) {
                        if(err){
                            response.json({
                                status: 400,
                                message: "Error while fetching details"
                            })
                        }
                        else{
                            if(result){
                                dbo.collection(collectionName).find(
                                    {},
                                    {
                                        projection: {
                                            "_id": 1,
                                            "name": 1,
                                            "email": 1,
                                            "place": 1,
                                            "profession": 1
                                        }
                                    }
                                ).skip(startLimit).limit(endLimit).toArray(async function(err, result) {
                                    if (err) {
                                        response.json({
                                            status: 400,
                                            message: "Error while fetching details"
                                        })
                                    }
                                    else{
                                        response.json({
                                            status: 200,
                                            message: "User details fetched successfully",
                                            data: result
                                        });
                                    }
                                });
                            }
                            else{
                                response.json({
                                    status: 403,
                                    message: "Not authorized",
                                    data: []
                                })
                            }
                        }
                    }
                )
            });
        }
        else{
            response.json({
                status: 200,
                message: "Start and end limit must be numeric",
                data : {}
            })
        }
    }
    catch(err){
        response.json({
            status: 400,
            message: "Error occured while fetching details"
        })
    }
}

exports.userDetails = {
    saveUserDetails,
    userLogin,
    fetchUserDetails,
}