/* I have utilized ChatGPT and Perplexity as resources for guidance and learning throughout this project. My approach reflects the growing trend of modern developers using AI tools to enhance their coding processes. However, all the final code presented here is my own work, based on own independently thought out  prompts and without copying prompts or code from others other than snippets. I believe this practice aligns with the principles of academic honesty, as it emphasizes learning and using technology responsibly. */

const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  test('Convert a valid input such as 10L: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({input: '10L'})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        assert.approximately(res.body.returnNum, 2.64172, 0.1);
        assert.equal(res.body.returnUnit, 'gal');
        done();
      });
  });

  test('Convert an invalid input such as 32g: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({input: '32g'})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'invalid unit');
        done();
      });
  });

  test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({input: '3/7.2/4kg'})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'invalid number');
        done();
      });
  });

  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({input: '3/7.2/4kilomegagram'})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'invalid number and unit');
        done();
      });
  });

  test('Convert with no number such as kg: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({input: 'kg'})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.approximately(res.body.returnNum, 2.20462, 0.1);
        assert.equal(res.body.returnUnit, 'lbs');
        done();
      });
  });

  test('Mixed Fractional and Decimal Input (e.g., 2.5/5kg)', function(done) {
    chai.request(server)
        .get('/api/convert')
        .query({ input: '2.5/5kg' })
        .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 0.5);
            assert.equal(res.body.initUnit, 'kg');
            assert.approximately(res.body.returnNum, 1.10231, 0.1);
            assert.equal(res.body.returnUnit, 'lbs');
            done();
        });
   });


});
