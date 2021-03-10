'use strict';

const yelp = require('yelp-fusion');

const apiKey = 'kmZCybUTGfX7t2IdXVXVjD9QNXGGK3EZ-CJMFLOSHF9_ZND-xuUm7YWOvR0nN49_m9tchQNpB4vdeW2OJ4NwYfjmX8JlJccPjrTv33qReJmPar6xoHYrUZaEBClIYHYx';

const searchRequest = {
  location: 'Alpharetta',
  categories: 'icecream',
  sort_by: 'rating',
  limit: '5'
};

const client = yelp.client(apiKey);

var i = 0;

function showOutput(){
  setTimeout(function() {
    client.search(searchRequest).then(response => { 
        console.log("Ice Cream Shop " + (i + 1) + "\n\n");
        let name = response.jsonBody.businesses[i].name;
        console.log("Business Name: " + name + "\n\n");
        console.log("Business Address: " + response.jsonBody.businesses[i].location.address1 + ", " + response.jsonBody.businesses[i].location.city + "\n\n");
    
        client.reviews(response.jsonBody.businesses[i].alias).then(response => {
          console.log("Excerpt From A Review Of That Business: " + response.jsonBody.reviews[0].text + "\n\n");
          console.log("Name Of The Person That Wrote The Review: " + response.jsonBody.reviews[0].user.name + "\n\n");
          console.log("End of Business Information of: " + name + "\n\n\n");
        }).catch(e => {
          console.log(e);
        });

        i++;
    }).catch(e => {
      console.log(e);
    });

    if(i < 4){
      showOutput();
    }
  }, 1000);
}

showOutput();







