const nodemailer = require("nodemailer");
const { USER, PASS } = require("./server-config")

const transport = nodemailer.createTransport(
    {
        host: "smtp.google.com",
        port: 465,
        secure: true,
        auth: {
            user: USER,
            pass: PASS
        }
    }
)

const mailUser = (recieverMail, subject, message) => {
    const mailOptions = {
        from: USER,
        to: recieverMail,
        subject: subject,
        html: message
    };

    transport.sendMail(
        mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        }
    );
}

module.exports = { mailUser };