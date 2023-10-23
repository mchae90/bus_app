var express = require('express');
var router = express.Router();
const axios = require('axios');
require('dotenv').config();

let cachedData = null;

const fetchBuses = async () => {
  try {
    const url = `https://bustime.mta.info/api/siri/vehicle-monitoring.json?LineRef=MTABC_Q102&key=${process.env.MTA_API_KEY}`;
    const res = await axios.get(url);
    cachedData = res.data;
    console.log('external API called');
    return res.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

// Initial fetch
fetchBuses();

setInterval(async () => {
  try {
    const data = await fetchBuses();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}, 30 * 1000);

router.get('/', function(req, res) {
  if (cachedData) {
    console.log('cache hit');
    res.json(cachedData);
  } else {
    console.log('cache miss');
    fetchBuses().then((data) => {
      res.json(data);
    });
  }
});

module.exports = router;
