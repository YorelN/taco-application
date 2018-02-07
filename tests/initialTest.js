var expect = require('expect');
var axios = require('axios');
var nock = require('nock');

var response = "Hello";

function getUser() {
  return axios
    .get(`http://taco_application:3000/api/test`)
    .then(res => res.data)
    .catch(error => console.log(error));
}

module.exports = {
  'Demo test': function(browser) {
    browser
      .url(browser.launchUrl + 'test')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('a.link-to-test', 4000);

    browser.click('.link-to-test');

    browser.assert.urlEquals(browser.launchUrl);
    browser.waitForElementVisible('.adiv', 3000);
  },
  'Test Home page': function(browser) {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('div', 3000);
  },
  'Testing Mock Data': function(browser) {
    nock('http://taco_application:3000')
      .get('/api/test')
      .reply(200, response);

    browser
      .url(browser.launchUrl + 'test')
      .waitForElementVisible('a.link-to-test', 2000)
      .click('span');

    browser.expect.element('span').text.to.equal('Hello');

  }
};
