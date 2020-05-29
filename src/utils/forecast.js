// dependencies
const request = require('postman-request');
require('dotenv').config();


const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WRS_ACCESS_KEY}&query=${latitude},${longitude}&units=f`;
  request({url:url, json:true}, (error, res, body) => {
    if (error) {
      callback('Error: Something went wrong', undefined);
    } else if (body.success == false) {
      callback('Error: ', body.error.code, body.error.type);
    } else {
      callback(undefined, {
        statusCode: res && res.statusCode,
        city: body.location.name,
        timezone: body.location.timezone_id,
        current_temp: body.current.temperature + 'F',
        conditions: body.current.weather_descriptions[0],
        icon: body.current.weather_icons[0]
      });
    }
  });
};

module.exports = forecast;
