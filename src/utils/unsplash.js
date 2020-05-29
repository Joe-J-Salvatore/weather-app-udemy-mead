// dependencies
const request = require('postman-request');

credentials = {
  access_key: 'cPlfRcFWfrcEgMSxtxDGX-AcTtwvp5HFhfSMjG_n6Dw',
  secret_key: 'ij3ulntj_w9hZm65bZooFMs1Thigd-KVUh5Gi8UrDjA'
}

const unsplash = (location, callback) => {
  const url = `https://api.unsplash.com/search/photos?query=${location}&orientation=landscape&page=1&client_id=${credentials.access_key}`;

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
