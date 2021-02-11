var nodemailer = require('nodemailer');

const environmentDetails = {
    hostName: 'localhost',
    port: 3002
}

const databaseDetails = {
    dbName: "apoxeoTask",
    mongoDBUrl : "mongodb://localhost:27017/"
}

const mailDetails = {
    email: '<your-email-id',
    password: '<your-password>'
}

exports.configDetails = {
    environmentDetails,
    databaseDetails,
    mailDetails
}