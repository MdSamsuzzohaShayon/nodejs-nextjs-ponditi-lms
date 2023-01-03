const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
// const unirest = require('unirest');

/*
var req = unirest('POST', 'http://66.45.237.70/api.php?username=XX&password=XXX&number=8801&message=Test API')
  .headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
  .send("")
  .end(function (res) {
    if (res.error) throw new Error(res.error);
    console.log(res.raw_body);
  });
  */

const sendSMS = async (to, body) => {
  try {
    const params = new URLSearchParams();
    params.append('username', process.env.BULK_SMS_USERNAME);
    params.append('password', process.env.BULK_SMS_PASSWORD);
    params.append('number', to);
    // const msgStr = `www.ponditi.com \n ${body}`;
    params.append('message', body);

    // const newURL = `http://66.45.237.70/api.php?username=${process.env.BULK_SMS_USERNAME}&password=${process.env.BULK_SMS_PASSWORD}&number=${to}&message=${body}`;
    const response = await fetch('http://66.45.237.70/api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });
    // console.log(response?.status);
    // const text = await response.text();
    // const data = JSON.parse(text);
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
  /*
  try {
    const params = new URLSearchParams();
    params.set('username', process.env.BULK_SMS_USERNAME);
    params.set('password', process.env.BULK_SMS_PASSWORD);
    params.set('number', to);
    params.set('message', body);
    const response = await unirest('POST', `http://66.45.237.70/api.php?${params.toString()}`)
      .headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
      .send('')
      .end((smsRes) => {
        if (smsRes.error) {
          // throw new Error(res.error);
          return null;
        }
        // console.log(smsRes.raw_body);
        return smsRes;
      });
    return response;
  } catch (smsErr) {
    console.log(smsErr);
  }
  return null;
  */
};

module.exports = sendSMS;
