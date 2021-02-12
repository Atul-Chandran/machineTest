// Importing built in modules
const MongoClient = require('mongodb').MongoClient;
const moment = require('moment');

// Importing code fragments
const configurationDetails = require('../config').configDetails;
const dbConfigDetails = configurationDetails.databaseDetails;

const collectionName = "user_language";

// Adding languages associated to the user email
function addLanguages(request,response){
    const requestMessage = request.body;
    if(requestMessage){
        email = requestMessage.email;
        languages = requestMessage.languages;

        if(email && languages){
            MongoClient.connect(dbConfigDetails.mongoDBUrl,{poolSize: 10, bufferMaxEntries: 0, reconnectTries: 5000, useNewUrlParser: true,useUnifiedTopology: true}, function(err, db) {
                if (err) throw err;
                var dbo = db.db(dbConfigDetails.dbName);

                // Verifying if languages has already been entered for this email
                var languageQuery = {
                    "email": email
                };
                dbo.collection(collectionName).find(
                    languageQuery,
                    {
                        projection: {
                            "_id": 1,
                        }
                    }
                ).toArray(async function(err, result) {

                    // If there is no data associated in "user_language" for this email
                    if(result.length === 0){
                        dbo.collection(collectionName).insertOne(
                            {
                                email: email,
                                languages: languages,
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
                                    message: "Languages added successfully"
                                });
                            }
                            db.close();
                        });
                    }
                    else{
                        response.json({
                            status: 400,
                            message: "Languages for this user has already been added"
                        })
                    }
                });
            });
        }
        else{
            response.json({
                status: 400,
                message: "Insufficient details"
            })
        }
    }
}

exports.userLanguageDetails = {
    addLanguages
}