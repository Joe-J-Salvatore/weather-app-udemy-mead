// dependencies
const request = require('postman-request');
require('dotenv').config();

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.GEO_ACCESS_KEY}`;

  request({url:url, json:true}, (error, res, body) => {
    if (error) {
      callback('Problem connecting to network', undefined);
    } else if (body.features.length === 0) {
      callback('Location match not found', undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        latitude: body.features[0].geometry.coordinates[1],
        longitude: body.features[0].geometry.coordinates[0]
      });
    }
  });
}

module.exports = geocode;
