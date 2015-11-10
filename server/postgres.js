var Sequelize = require('sequelize');
var express = require('express');
var config = require('config');

var sequelize = new Sequelize(config.get('db.name'), config.get('db.user'), config.get('db.password'), {
  host: 'localhost',
  dialect: 'postgres'
});

// HERE'S THE ONE TABLE WITH ALL DATA
var PlaceYelp = sequelize.define('place_yelp', {
  name: {type: Sequelize.STRING},
  rating: {type: Sequelize.FLOAT},
  review_count: {type: Sequelize.INTEGER},
  lat: {type: Sequelize.FLOAT},
  long: {type: Sequelize.FLOAT},
  address: {type: Sequelize.STRING},
  city: {type: Sequelize.STRING},
  state: {type: Sequelize.STRING},
  postal_code: {type: Sequelize.INTEGER}
});

var Foursquare = sequelize.define('foursquare', {
  name: {type: Sequelize.STRING, unique: true},
  rating: {type: Sequelize.FLOAT},
  review_count: {type: Sequelize.INTEGER},
  lat: {type: Sequelize.FLOAT},
  long: {type: Sequelize.FLOAT},
  address: {type: Sequelize.STRING},
  city: {type: Sequelize.STRING},
  state: {type: Sequelize.STRING},
  postal_code: {type: Sequelize.INTEGER}
});

sequelize.authenticate().then(function(err, data) {
  console.log('Connected with PostgreSQL on non-test');
}).catch(function(err) {
  console.log(err.message);
});



module.exports = {
  model: PlaceYelp,
  yelp: function(data)  {
    PlaceYelp.sync().then(function() {
      data.forEach(function(item) {
        var result = {
          name: item.name,
          rating: item.rating,
          review_count: item.review_count,
          lat: item.lat,
          long: item.long,
          address: item.address,
          city: item.city,
          state: item.state,
          postal_code: item.postal_code
        };
        PlaceYelp.create(result).then(function() {
          console.log("YELP DONE");
        });
      });
    });
  },
  foursquare: function(data)  {
    Foursquare.sync().then(function() {
      data.forEach(function(item) {
        var result = {
          name: item.name,
          rating: item.rating,
          review_count: item.review_count,
          lat: item.lat,
          long: item.long,
          address: item.address,
          city: item.city,
          state: item.state,
          postal_code: item.postal_code
        };
        Foursquare.create(result).then(function() {
          console.log("FOUR DONE");
        });
      });
    });
  },
};
