const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const sendSMS = async (to, body) => {

  const message = await client.messages
    .create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    // .then((message) => console.log(message.sid));
    return message;
};


module.exports = sendSMS;
