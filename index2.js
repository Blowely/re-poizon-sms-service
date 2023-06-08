var express = require('express');
const axios = require("axios");
const https = require("https");

const app = express();
const port = 3003;
app.get('/api/sms', function(req, res) {
  const number = req.query.number;
  const text = req.query.code;
  const from = 're:poizon';

  const email = 'maryashin.2014@yandex.ru'
  const apiKey = '5uRZB7O0UstynQgbBeWNnMsn3nbK'
  const uri = `https://gate.smsaero.ru/v2/sms/send`;


  let url = [
    `${uri}`,
    '?text=', text,
    '&number=', number,
    '&sign=', from
  ].join('');


  axios({
    method: 'POST',
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
      console.log('Error: ', err.data);
    });
  res.send('hello world');
});

console.log('app listen on port: ' + port);
app.listen(port);