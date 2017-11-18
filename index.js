require('dotenv').config();

var watsonUser = process.env.IBM_CLOUD_USER;
var watsonPw = process.env.IBM_CLOUD_PW;
var watsonVersion = process.env.IBM_CLOUD_VERSION || '2017-11-18';

var express = require('express');
var app = express();

var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var personality_insights = new PersonalityInsightsV3({
  username: `${watsonUser}`,
  password: `${watsonPw}`,
  version_date: `${watsonVersion}`,
  headers: {
    'X-Watson-Learning-Opt-Out': 'true'
  }
});


var params = {
  // Get the content items from the JSON file.
  content_items: require('./profile.json').contentItems,
  consumption_preferences: true,
  raw_scores: true,
  headers: {
    'accept-language': 'en',
    'accept': 'application/json'
  }
};

personality_insights.profile(params, function(error, response) {
  if (error)
    console.log('Error:', error);
  else
    console.log(JSON.stringify(response, null, 2));
  }
);

app.get('/', function (req, res) {
  res.send('hello world')
})

