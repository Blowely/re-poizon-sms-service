var express = require('express');
const axios = require("axios");
const https = require("https");

const app = express();
const port = 3002;
app.get('/api/sms', function(req, res) {
  const number = req.query.number;
  const text = req.query.code;
  const from = 're:poizon';

  const email = 'maryashin.2014@yandex.ru'
  const apiKey = '5uRZB7O0UstynQgbBeWNnMsn3nbK'
  const uri = `https://${email}:${apiKey}@gate.smsaero.ru/v2/sms/send`;
  const test = `https://maryashin.2014@yandex.ru:5uRZB7O0UstynQgbBeWNnMsn3nbK@gate.smsaero.ru/v2/auth`;


  let url = [
    `${uri}`,
    '?text=', text,
    '&number=', number,
    '&sign=', from
  ].join('');

  const auth = new Buffer.from(`${email}:${apiKey}`,'base64');
  axios({
    url: 'https://maryashin.2014@yandex.ru:5uRZB7O0UstynQgbBeWNnMsn3nbK@gate.smsaero.ru/v2/auth',
    headers: {
      Authorization: `Basic bWFyeWFzaGluLjIwMTRAeWFuZGV4LnJ1OjV1UlpCN08wVXN0eW5RZ2JCZVdObk1zbjNuYks=`
    }
  })
    .then(res => {
      const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
      console.log('Status Code:', res.status);
      console.log('Date in Response header:', headerDate);

      const data = res.data;
      console.log('res=,', res.statusText);
      console.log('req=,', res);

    })
    .catch(err => {
      console.log('Error: ', err);
    });
  res.send('hello world');
});

console.log('app listen on port: ' + port);
app.listen(3002);