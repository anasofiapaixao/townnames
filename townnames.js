const CronJob = require('cron').CronJob;
const axios = require('axios');
const Twit = require('twit');
const twitterConfig = require('./data/twitterConfig');
const wordnikConfig = require('./data/wordnikConfig');
const twitter = new Twit(twitterConfig);

const suffixes = [
  'wick',
  'leigh',
  'don',
  'ington',
  'ham',
  'bury',
  'end',
  'rey',
  'ford',
  'rock',
  'side',
  'ston',
  'combe',
  'heath',
  'gate',
  'hive',
  'dale',
  'more ',
  'ester',
  'borough',
  'field'
];

const preSuffixes = [
  'er',
  'ings'
];

const postSuffixes = [
  ' in the Beans'
];



let start = function() {
  let job = new CronJob('0 42 */2 * * *', function () {
    tweet()
        .catch(error => console.log(error));
  }, null, true, 'Europe/Lisbon');

  job.start();
};

let tweet = async function () {
 let townName = await generateTownName();
 twitter.post('statuses/update', { status: townName }, error => error ? console.log(error) : '');
 return townName;
};

async function generateTownName() {
  let suffixAmount = randomInt(1, 2);
  let preSuffixAmount = randomInt(0, 1);
  let hasPostSuffix = !randomInt(0, 50);

  let townName = await getWord();

  for(let i = 0; i < preSuffixAmount; ++i) {
    townName += randomItem(preSuffixes)
  }

  for(let i = 0; i < suffixAmount; ++i) {
    townName += randomItem(suffixes);
  }

  if(hasPostSuffix) {
    townName += randomItem(postSuffixes);
  }

  return capitalize(townName);
}

async function getWord() {
  let response = await
      axios.get('http://api.wordnik.com/v4/words.json/randomWord?includePartOfSpeech=noun&api_key=' + wordnikConfig.apiKey);
  return response.data.word;
}

function randomInt(from, to) {
  return Math.floor(Math.random()*1000) % (to + 1 - from) + from;
}

function randomItem(fromArray) {
  return fromArray[randomInt(0, fromArray.length - 1)];
}

function capitalize(fromString) {
  return fromString.split(' ')
      .map(word => word[0].toUpperCase() + word.substr(1).toLowerCase())
      .join(' ');
}

module.exports = {
  start: start,
  tweet: tweet
};