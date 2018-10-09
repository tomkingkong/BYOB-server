const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const WineData = require('../db/seeds/dev/vineyards');

chai.use(chaiHttp);

describe('API ROUTES', () => {
  beforeEach(() => {
    wines = WineData;
  });

  it('GET /api/v1/vineyards should return all wines', done => {
    chai
      .request(server)
      .get('/api/v1/vineyards')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.message.should.be.a('string');
        response.body.data.should.be.a('array');
        response.body.data.length.should.equal(3);
        response.body.data[0].should.have.property('name');
        response.body.data[0].name.should.equal('FunkyTown Vineyards');
        response.body.data[0].should.have.property('location');
        response.body.data[0].location.should.equal('Vail, CO');
        response.body.data[0].should.have.property('date_established');
        response.body.data[0].date_established.should.equal(2000);
        response.body.data[0].should.have.property('harvest');
        response.body.data[0].harvest.should.equal(true);
        done();
      });
  });
});
