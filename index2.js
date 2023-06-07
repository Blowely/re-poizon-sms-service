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
  const apiKey = 'lE79sqqo0YExECwap62UVSzKd6etgBlkKfxbg8v1sM9NG8NJ0TAGuK7NqMm4'
  const uri = `https://${email}:${apiKey}@gate.smsaero.ru/v2/sms/send`;
  const test = 'https://auth.terasms.ru/outbox/send/json';
  //const test = 'https://auth.terasms.ru/outbox/send?login=maryashin.2014@yandex.ru&password=L46Y3G626V&target=79202972447&sender=terasms&message=test`;


  let url = [
    `${uri}`,
    '?text=', text,
    '&number=', number,
    '&sign=', from
  ].join('');

  const body = {
    "login": "maryashin.2014@yandex.ru",
    "password": "L46Y3G626V",
    "target": 79202972447,
    "message": "ку-ку",
    "sender": "terasms.ru"

  }

  axios({
    method: 'POST',
    url: test,
    /*headers: {
      'X-Token': apiKey,
      "Content-Type": 'application/json',
    },*/
    data: body
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