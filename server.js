process.on('uncaughtException', function (error) {

    function sendEmail(mailData) {
        var nodemailer = require("derby-auth/node_modules/nodemailer");

        // create reusable transport method (opens pool of SMTP connections)
        // TODO derby-auth isn't currently configurable here, if you need customizations please send pull request
        var smtpTransport = nodemailer.createTransport("SMTP",{
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        // send mail with defined transport object
        smtpTransport.sendMail(mailData, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: " + response.message);
            }

            smtpTransport.close(); // shut down the connection pool, no more messages
        });
    }

    sendEmail({
        from: "HabitRPG <admin@habitrpg.com>",
        to: "tylerrenelle@gmail.com",
        subject: "HabitRPG Error",
        text: error.stack
    });
    console.log(error.stack);
});

require('coffee-script') // remove intermediate compilation requirement
require('./src/server').listen(process.env.PORT || 3000);

// Note: removed "up" module, which is default for development (but interferes with and production + PaaS)
// Restore to 5310bb0 if I want it back (see https://github.com/codeparty/derby/issues/165#issuecomment-10405693)
