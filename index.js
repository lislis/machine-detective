require('dotenv').config();

var watsonUser = process.env.IBM_CLOUD_USER;
var watsonPw = process.env.IBM_CLOUD_PW;
var watsonVersion = process.env.IBM_CLOUD_VERSION || '2017-11-18';

var port = process.env.PORT || '3002'

var express = require('express');
var app = express();

// this is where the Ember frontend lives
app.use(express.static(__dirname + '/frontend/dist'));

var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var personality_insights = new PersonalityInsightsV3({
  username: `${watsonUser}`,
  password: `${watsonPw}`,
  version_date: `${watsonVersion}`,
  headers: {
    'X-Watson-Learning-Opt-Out': 'true'
  }
});


function queryWatson(profileName) {
  // From the IBM Watson Node docs
  // promisified
  return new Promise(function(resolve, reject) {
    let params = {
      content_items: require(`./profiles/${profileName}.json`).contentItems,
      consumption_preferences: true,
      raw_scores: true,
      headers: {
        'accept-language': 'en',
        'accept': 'application/json'
      }
    };

    personality_insights.profile(params, function(error, response) {
      if (error) {
        console.log('Error while getting profile data:', error);
        reject();
      } else {
        resolve(response);
      }
    });
  })
};

// These are the profiles we have ready
var politicians = ['merkel', 'rajoy', 'macron', 'may'];
var personalities = {};

// Let's fill the personalities data set
politicians.forEach((k) => {
  personalities[k] = {};
  queryWatson(k).then((data) => { personalities[k] = data; });
});


app.get('/api/personalities', function (req, res) {
  //console.log(personalities);
  res.send(JSON.stringify(personalities));
})

app.get('/test', function (req, res) {
  res.send('Hello');
});


app.listen(port, function() {
  console.log(`hey, server running at ${port}`);
});
