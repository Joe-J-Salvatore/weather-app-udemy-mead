// dependencies
const request = require('postman-request');
require('dotenv').config();

const unsplash = (location, callback) => {
  const url = `https://api.unsplash.com/search/photos?query=${location}&orientation=landscape&page=1&client_id=${process.env.UNS_ACCESS_KEY}`;

  request({url, json:true}, (error, res, body) => {
    if (error) {
      callback('Problem connecting to network', undefined);
    } else {
      const rand = Math.floor(Math.random() * 11);
      callback(undefined, {
        src: body.results[rand].urls.regular
      });
    }
  });
}

module.exports = unsplash;
