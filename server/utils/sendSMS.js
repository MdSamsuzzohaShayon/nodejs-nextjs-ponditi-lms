const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// var req = unirest('POST', 'http://66.45.237.70/api.php?username=XX&password=XXX&number=8801&message=Test API')
//   .headers({
//     'Content-Type': 'application/x-www-form-urlencoded'
//   })
//   .send("")
//   .end(function (res) {
//     if (res.error) throw new Error(res.error);
//     console.log(res.raw_body);
//   });

const sendSMS = async (to, body) => {
  try {
    const params = new URLSearchParams();
    params.append('username', process.env.BULK_SMS_USERNAME);
    params.append('password', process.env.BULK_SMS_PASSWORD);
    params.append('number', to);
    params.append('message', body);

    // const newURL = `http://66.45.237.70/api.php?username=${process.env.BULK_SMS_USERNAME}&password=${process.env.BULK_SMS_PASSWORD}&number=${to}&message=${body}`;


    const response = await fetch('http://66.45.237.70/api.php', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params,
    });
    const text = await response.text();
    // const data = JSON.parse(text);
    return text;
  } catch (error) {
    console.log(error);
  }
  return null;
};

module.exports = sendSMS;
