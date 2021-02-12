var nodemailer = require('nodemailer');
const configurationDetails = require('../config').configDetails;

const sourceEmailId = configurationDetails.mailDetails.email;
const sourcePassword = configurationDetails.mailDetails.password;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: sourceEmailId,
    pass: sourcePassword
  }
});
function sendMail(emailId, subject, emailMessage){
    var isMailSentSuccessful = true;
    var mailOptions = {
        from: sourceEmailId,
        to: emailId,
        subject: subject,
        html: emailMessage
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          isMailSentSuccessful = false;
        }
      });
    return isMailSentSuccessful;
}

exports.sendMail = sendMail
