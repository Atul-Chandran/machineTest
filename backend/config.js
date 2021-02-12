const environmentDetails = {
    hostName: 'localhost',
    port: 3002
}

const databaseDetails = {
    dbName: "apoxeoTask",
    mongoDBUrl : "mongodb://localhost:27017/"
}

const mailDetails = {
    email: '<your-email-id>',
    password: '<your-email-password>'
}

const agoraDetails = {
    appId: "<agora-app-id>",
    appCertificate: "<agora-app-certificate>",
    tokenExpiryTime: 3600
}

exports.configDetails = {
    environmentDetails,
    databaseDetails,
    mailDetails,
    agoraDetails
}