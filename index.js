const express = require("express");
const axios = require("axios");


const app = express();
const port = 3005;
app.get('/api/sms', async function(req, res) {
  const number = req.query.number;
  const text = req.query.code;
  const from = 're:poizon';

  const email = 'moviefokll@gmail.com'
  const apiKey = 'YHlsgo25Cs_zmFlRAyCuj8RMMauF8Za-'
  const uri = `https://gate.smsaero.ru/v2/sms/send`;
  const test = `https://gate.smsaero.ru/v2/auth`;

  const checkStatusUrl = 'https://gate.smsaero.ru/v2/sms/status?id=570999927';


  let url = [
    `${uri}`,
    '?number=', number,
    '&text=', 'ку-ку',
    '&sign=', 'SMS Aero'
  ].join('');

  const auth = new Buffer.from(`${email}:${apiKey}`,'base64');

  axios({
    method: 'GET',
    url: url,
    headers: {
      'Authorization': `Basic ${btoa(email + ':' + apiKey)}`,
    },
  })
    .then(res => {
      const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
      console.log('Status Code:', res.status);
      console.log('Date in Response header:', headerDate);

      const data = res.data;
      console.log('res=,', res);
      console.log('data=,', data);

    })
    .catch(err => {
      console.log('Error: ', err);
    });
  res.send('hello world');
});

console.log('app listen on port: ' + port);
app.listen(port);