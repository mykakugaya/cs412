const express = require('express');
const router = express.Router();
const axios = require('axios');
const redis = require('redis');

// redis client
const redisPort = 6379
const redisUrl = `redis://localhost:${redisPort}`;
const redisClient = redis.createClient(redisUrl);

//log error to the console if any occurs
redisClient.on("error", (err) => {
    console.log(err);
});

// Get and return live covid stats for searched country
router.post('/', async function (req, res, next) {
    // set cors headers
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

    // get input country from req.body
    const searchTerm = req.body.country.toLowerCase();
    console.log(searchTerm);

    // get country slug from redis if countries already cached, else get from api
    // const countrySlug = await getCountrySlug(searchTerm, res);
    // console.log(countrySlug);
    const countriesUrl = `https://api.covid19api.com/countries`;
    const countriesResponse = await axios.get(countriesUrl);
    const countries = countriesResponse.data;
    // get country slug if country is in countries list
    const country = countries.find(country => country.Country.toLowerCase() === searchTerm);

    if (country) {
        // get api results by country
        const reqUrl = `https://api.covid19api.com/country/${country.Slug}/status/confirmed/live`;
        try {
            // get api results
            const response = await axios.get(reqUrl);
            const data = response.data;
            // get last updated date
            const lastUpdate = data[data.length - 1];
            console.log(lastUpdate);
            // return api results with status 200
            // returning most recent live update in data
            // format response data
            const responseData = {
                country: lastUpdate.Country,
                cases: lastUpdate.Cases
            }
            res.status(200).send(responseData);
        } catch (err) {
            res.status(500).send({message: err.message});
        }
    }

});

/*
get country slug for searched country from countries list in redis cache
Get list of countries from redis if cached, else get from api
countries: [{
    "Country": "United States of America",
    "Slug": "united-states",
    "ISO2": "US"
  }, ...]
 */
async function getCountrySlug(searchTerm, res) {
    try {
        // get countries from redis (if cached)
        redisClient.get('countries', function (err, countries) {
            if (err) throw err;
            if(countries) {
                // get country slug from countries list
                const country = JSON.parse(countries).find(country => country.Country.toLowerCase() === searchTerm);
                // if country is found
                if (country) {
                    console.log("country found in redis");
                    return country.Slug;
                } else { // if country is not found
                    return Error("country not found");
                }
            } else { // if countries are not cached
                console.log("countries not found in redis");
                // list not in cache, get countries from api and store in redis
                const countriesUrl = `https://api.covid19api.com/countries`;
                const countriesResponse = axios.get(countriesUrl);
                const countries = countriesResponse.data;
                console.log(countries);
                // store countries in redis
                redisClient.set('countries', JSON.stringify(countries));
                return getCountrySlug(searchTerm);
            }
        });
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

module.exports = router;