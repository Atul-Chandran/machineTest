// Importing built in modules
const MongoClient = require('mongodb').MongoClient;
const moment = require('moment');
const md5 = require('md5');

// Importing code fragments
const configurationDetails = require('../config').configDetails;
const dbConfigDetails = configurationDetails.databaseDetails;
const collectionName = "users";

const mailServiceFunction = require('../Services/sendMail.service').sendMail;

function saveUserDetails(request,response){
    requestMessage = request.body;
    response.setHeader('Content-Type', 'application/json');

    // If details in the request body has been passed
    if(Object.keys(requestMessage).length > 0){

        // Details which will be required for user creation
        name = requestMessage.name;
        email = requestMessage.email;
        password = requestMessage.password;
        phoneNumber = requestMessage.phoneNumber;
        gender = requestMessage.gender;
        place = requestMessage.place;
        profession = requestMessage.profession;
        languagesKnown = requestMessage.languagesKnown;

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
            if(result.length === 0){
                dbo.collection(collectionName).insertOne(
                    {
                        name: name,
                        email: email,
                        password: md5(password),
                        phoneNumber: phoneNumber,
                        gender: gender,
                        place: place,
                        profession: profession,
                        languagesKnown: languagesKnown,
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
                        response.json({
                            status: 200,
                            message: "Data succesfully added",  
                        })
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

function userLogin(request,response){
    requestMessage = request.body;
    
    if(Object.keys(requestMessage).length > 0){
        email = requestMessage.email;
        password = requestMessage.password;

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

                        // Sending a success response mail to the user
                        mailServiceFunction(
                            result["email"],
                            "Login Successful",
                            "<h1> Login Successful!! Congrats </h1>"
                        )
                        
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

function fetchUserDetails(request,response){
    const requestParamters = request.params;
    try{
        if(requestParamters["userEmail"]){

            // Request parameters
            const email = requestParamters["userEmail"];
    
            // Limit parameters for pagination
            const startLimit = parseInt(requestParamters["start"]);
            const endLimit = parseInt(requestParamters["end"]);
    
            MongoClient.connect(dbConfigDetails.mongoDBUrl, function(err, db) {
                var dbo = db.db(dbConfigDetails.dbName);
                var query = {
                    // email: email,
                    email: "abc@gmail.com"
                }
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
                                            "email": 1
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
    fetchUserDetails
}