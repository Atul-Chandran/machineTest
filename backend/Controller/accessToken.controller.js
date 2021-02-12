const {RtcTokenBuilder, RtcRole} = require('agora-access-token');

//**** Agora details ****
const agoraDetails = require('../config').configDetails.agoraDetails;

function getAccessToken(request,response){
    response.header('Access-Control-Allow-Origin', '*');
    const requestParamters = request.params;

    // Request path variables
    const channelName = requestParamters["channelName"];
    var userRole = requestParamters["role"];

    // If both the variables have a valid value
    if(channelName && userRole){
        // fetches a random number to increase the chances of a random user Id
        let uid = Math.random(10000);

        // default value given to the user in case of invalid role given
        let role = RtcRole.SUBSCRIBER;

        // fetches user role
        userRole = parseInt(userRole);
        if(userRole){

            // verifying if the given user role is either 1 or 2
            switch(userRole){
                case 1: role = RtcRole.PUBLISHER;
                        break;
                case 2: role = RtcRole.SUBSCRIBER;
                        break;
                default: role = null;
            }

            // If the given user role is neither 1 nor 2, it is deemed invalid
            if(role){

                // fetches the expire time from config
                let expireTime = agoraDetails.tokenExpiryTime;

                // calculate privilege expire time
                const currentTime = Math.floor(Date.now() / 1000);
                const privilegeExpireTime = currentTime + expireTime;

                // building the final token
                const token = RtcTokenBuilder.buildTokenWithUid(agoraDetails.appId, agoraDetails.appCertificate, channelName, uid, role, privilegeExpireTime);

                response.json({
                    status: 200,
                    message: "Token fetched successfully",
                    data: {
                        userRole : role === 1 ? "Publisher" : "Subscriber",
                        token: token
                    }
                });
            }
            else{
                response.json({
                    status: 400,
                    message: "Invalid role",
                    data: {}
                })
            }
        }
        else{
            response.json({
                status: 400,
                message: "Role must be an integer"
            })
        }
    }
    else{
        response.json({
            status: 403,
            message: "Channel name not provided"
        })
    }

}

exports.accessDetails = {
    getAccessToken
}