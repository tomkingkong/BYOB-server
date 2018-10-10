const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');
chai.use(chaiHttp);

describe('API ROUTES', () => {
  beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return knex.seed.run()
        .then(function() {
          done();
  });
      });
    });
  });

  it('GET /api/v1/vineyards should return all vineyards HAPPY', done => {
    chai
      .request(server)
      .get('/api/v1/vineyards')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.status.should.be.a('string');
        response.body.status.should.equal('ok');
        response.body.message.should.be.a('string');
        response.body.message.should.equal('Enjoy your vineyards!');
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
  it('GET /api/v1/vineyards/:vineyard_id should return one vineyard HAPPY', done => {
    chai
      .request(server)
      .get('/api/v1/vineyards/1')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.data.should.be.a('array');
        response.body.data.length.should.equal(1);
        response.body.status.should.be.a('string');
        response.body.status.should.equal('ok');
        response.body.message.should.be.a('string');
        response.body.message.should.equal('Here is your vineyard!');
        response.body.data[0].should.have.property('name');
        response.body.data[0].name.should.equal('FunkyTown Vineyards');
        response.body.data[0].should.have.property('location');
        response.body.data[0].location.should.equal('Vail, CO');
        response.body.data[0].should.have.property('date_established');
        response.body.data[0].date_established.should.equal(2000);
        response.body.data[0].should.have.property('harvest');
        response.body.data[0].harvest.should.equal(true);
        done();
      })
  });
  it('POST /api/v1/vineyards should add one vineyard HAPPY', done => {
    chai
      .request(server)
      .post('/api/v1/vineyards')
      .send({
        name: `ShmoopyPoots Vineyards`,
        location: `Shmonty, CO`,
        date_established: 1806,
        harvest: true
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.id.should.be.a('number');
        response.body.id.should.equal(4);
        done();
      })
  });


  it('PUT /api/v1/vineyards/:vineyard_id should update one vineyard HAPPY', done => {
    chai
      .request(server)
      .put('/api/v1/vineyards/1')
      .send({
        name: `FunkyTown Vineyards`,
        location: `Vail, CO`,
        date_established: 2000,
        harvest: false
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('FunkyTown Vineyards');
        response.body[0].should.have.property('location');
        response.body[0].location.should.equal('Vail, CO');
        response.body[0].should.have.property('date_established');
        response.body[0].date_established.should.equal(2000);
        response.body[0].should.have.property('harvest');
        response.body[0].harvest.should.equal(false);
        done();
      })
  });
});
