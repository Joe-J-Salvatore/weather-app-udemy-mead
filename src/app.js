// dependencies
const path = require('path');
const request = require('postman-request');
const express = require('express');
const app = express();
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const unsplash = require('./utils/unsplash');

const port = process.env.PORT || 3000;

// view engine
app.set('view engine', 'hbs');
// views path
const viewsPath = path.join(__dirname, '../templates/views');
app.set('views', viewsPath);

// public directory
const publicDirPath = path.join(__dirname, '../public');
app.use(express.static(publicDirPath));

// partials
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath, (error) => {});


// paths
app.get('', (req, res) => res.render('index', {title: 'Weather App'}));
app.get('/about', (req, res) => res.render('about', {title: 'About us...', author: 'Created by this guy'}));
app.get('/help', (req, res) => res.render('help', {title: 'Help!', message: 'We\'re here to help'}));
app.get('/help/*', (req, res) => res.render('404', {title: 404, message: 'Help article not found'}));

// weather data
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send({
      error: 'You must provide an address'
    });
  } else {
    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
      if (error) {
        return res.send({error});
      }

      forecast(latitude, longitude, (error, {current_temp, conditions}) => {
        if (error) {
          return res.send({error});
        }

        unsplash(location, (error, {src}) => {
          if (error) {
            return res.send({error});
          }

          res.send({
            location,
            forecast: current_temp,
            conditions,
            src
          });

        }); // end unsplash
      }); // end forecast
    }); // end geocode
  } // end else
}); // end get


// 404 requests
app.get('*', (req, res) => res.render('404', {title: 404, message: 'You\'ve reached a page that doesn\'t exist'}));

// handler
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
