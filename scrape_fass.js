var Nightmare = require('nightmare');   
var nightmare = Nightmare({ show: false });
var fs = require('fs');

/*Add relevant product names*/
var prodnames = ['Praluent', 'Kuvan'];

prodnames.reduce(function(accumulator, url) {
  return accumulator.then(function(results) {
    return nightmare.goto('http://fass.se/LIF/')
  .type('#mainsearchinputfield', url)
  .click('#mainsearchsubmit')
  .wait('.link')
  .click('.linkList:nth-child(1) .link')
  .wait('.fass-content')
  .evaluate(function () {
    return document.querySelector('.fass-content').textContent;
  })
  .then(function (result) {
    results.push(result);
    return results;
      });
  });
}, Promise.resolve([])).then(function(results){
    fs.writeFile('pharma.txt', results);
});