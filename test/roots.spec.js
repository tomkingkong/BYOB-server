const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const config = require('../knexfile')['test'];
const database = require('knex')(config);

chai.use(chaiHttp);

describe('API ROUTES', () => {
  beforeEach(done => {
    database.migrate.rollback().then(() => {
      database.migrate.latest().then(() => {
        return database.seed.run().then(function() {
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
        response.body.data.length.should.equal(2);
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

  it('GET /api/v1/vineyards should return all vineyards SAD', done => {
    chai
      .request(server)
      .get('/api/v1/vineyardsfasds/')
      .end((err, response) => {
        response.should.have.status(404);
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
      });
  });

  it('GET /api/v1/vineyards/:vineyard_id should return one vineyard SAD', done => {
    chai
      .request(server)
      .get('/api/v1/vineyards/31325')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
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
        response.body.id.should.equal(3);
        done();
      });
  });

  it('POST /api/v1/vineyards should add one vineyard SAD if missing param', done => {
    chai
      .request(server)
      .post('/api/v1/vineyards')
      .send({
        asd: `ShmoopyPoots Vineyards`
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.error.should.be.a('string');
        response.body.error.should.equal(`You are missing "name" parameter.`);
        done();
      });
  });

  it('POST /api/v1/vineyards should add one vineyard SAD if vineyard already exists', done => {
    chai
      .request(server)
      .post('/api/v1/vineyards')
      .send({
        name: `FunkyTown Vineyards`,
        location: `Vail, CO`,
        date_established: 2000,
        harvest: true
      })
      .end((err, response) => {
        response.should.have.status(400);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.error.should.be.a('string');
        response.body.error.should.equal(`Vineyard already exists.`);
        done();
      });
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
        response.body.status.should.be.a('string');
        response.body.status.should.equal('ok');
        response.body.data.should.be.a('array');
        response.body.data.length.should.equal(1);
        response.body.data[0].should.have.property('name');
        response.body.data[0].name.should.equal('FunkyTown Vineyards');
        response.body.data[0].should.have.property('location');
        response.body.data[0].location.should.equal('Vail, CO');
        response.body.data[0].should.have.property('date_established');
        response.body.data[0].date_established.should.equal(2000);
        response.body.data[0].should.have.property('harvest');
        response.body.data[0].harvest.should.equal(false);
        done();
      });
  });

  it('PUT /api/v1/vineyards/:vineyard_id should update one vineyard SAD', done => {
    chai
      .request(server)
      .put('/api/v1/vineyards/1')
      .send({
        bob: `FunkyTown Vineyards`,
        loblaw: `Vail, CO`
      })
      .end((err, response) => {
        response.should.have.status(400);
        response.body.status.should.be.a('string');
        response.body.status.should.equal('failed');
        done();
      });
  });

  it('DELETE /api/vi/vineyards/:vineyard_id should remove a vineyard HAPPY', done => {
    chai
      .request(server)
      .delete('/api/v1/vineyards/1')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.message.should.be.a('string');
        response.body.message.should.equal('Successful deletion of Vineyard.');
        done();
      });
  });

  it('DELETE /api/vi/vineyards/:vineyard_id should remove a vineyard SAD', done => {
    chai
      .request(server)
      .delete('/api/v1/vineyards/12341234')
      .end((err, response) => {
        response.should.have.status(404);
        response.body.error.should.be.a('string');
        response.body.error.should.equal('Could not find Vineyard.');
        done();
      });
  });
});

describe('API ROUTES', () => {
  beforeEach(done => {
    database.migrate.rollback().then(() => {
      database.migrate.latest().then(() => {
        return database.seed.run().then(function() {
          done();
        });
      });
    });
  });

  it('GET /api/v1/wines should return all wines HAPPY', done => {
    chai
      .request(server)
      .get('/api/v1/wines')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.message.should.be.a('string');
        response.body.data.should.be.a('array');
        response.body.data.length.should.equal(3);
        response.body.data[2].should.have.property('name');
        response.body.data[2].name.should.equal('badWine');
        response.body.data[2].should.have.property('grape_type');
        response.body.data[2].grape_type.should.equal('merlot');
        response.body.data[2].should.have.property('color');
        response.body.data[2].color.should.equal('red');
        response.body.data[2].should.have.property('production_year');
        response.body.data[2].production_year.should.equal(2012);
        response.body.data[2].should.have.property('score');
        response.body.data[2].score.should.equal(50);
        response.body.data[2].should.have.property('price');
        response.body.data[2].price.should.equal('$19.95');
        done();
      });
  });

  it('GET /api/v1/wines should return all wines SAD', done => {
    chai
      .request(server)
      .get('/api/v1/winesluvr')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });

  it('GET /api/v1/wines/:wine_id should return one wine HAPPY', done => {
    chai
      .request(server)
      .get('/api/v1/wines/2')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.message.should.be.a('string');
        response.body.data.should.be.a('array');
        response.body.data.length.should.equal(1);
        response.body.data[0].should.have.property('name');
        response.body.data[0].name.should.equal('okWine');
        response.body.data[0].should.have.property('grape_type');
        response.body.data[0].grape_type.should.equal('pinot');
        response.body.data[0].should.have.property('color');
        response.body.data[0].color.should.equal('white');
        response.body.data[0].should.have.property('production_year');
        response.body.data[0].production_year.should.equal(2000);
        response.body.data[0].should.have.property('score');
        response.body.data[0].score.should.equal(9);
        response.body.data[0].should.have.property('price');
        response.body.data[0].price.should.equal('$9.95');
        done();
      });
  });

  it('POST /api/v1/:vineyard_id/wines HAPPY', done => {
    chai
      .request(server)
      .post('/api/v1/2/wines')
      .send({
        name: 'testWine6',
        grape_type: 'pinot noir',
        color: 'red',
        production_year: 2008,
        price: '$69.95',
        score: 19
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.have.property('id');
        response.body.id.should.equal(4);
        done();
      });
  });

  it('POST /api/v1/:vineyard_id/wines SAD', done => {
    chai
      .request(server)
      .post('/api/v1/1/wines')
      .send({
        name: 'testWine9',
        grape_type: 'pinot noir',
        color: 'red'
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.should.be.json;
        response.body.should.have.property('error');
        response.body.error.should.equal(
          'You are missing "production_year" parameter'
        );
        done();
      });
  });

  it('PUT /api/v1/wines/:wine_id HAPPY', done => {
    chai
      .request(server)
      .put('/api/v1/wines/1')
      .send({
        name: 'greatWine',
        grape_type: 'pinot gris',
        color: 'white',
        production_year: 2009,
        price: '$99.95',
        score: 90
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('greatWine');
        response.body[0].should.have.property('grape_type');
        response.body[0].grape_type.should.equal('pinot gris');
        response.body[0].should.have.property('color');
        response.body[0].color.should.equal('white');
        response.body[0].should.have.property('production_year');
        response.body[0].production_year.should.equal(2009);
        response.body[0].should.have.property('score');
        response.body[0].score.should.equal(90);
        response.body[0].should.have.property('price');
        response.body[0].price.should.equal('$99.95');
        done();
      });
  });

  it('PUT /api/v1/wines/:wine_id SAD', done => {
    chai
      .request(server)
      .put('/api/v1/wines/1')
      .send({
        numero: 'greatWine',
        grape_type: 'pinot gris',
        color: 'white',
        price: '$99.95',
        score: 90
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.message.should.equal(
          'You do not have the correct information to complete this request'
        );
        done();
      });
  });

  it('DELETE /api/v1/wines/:wine_id should remove a wine HAPPY', done => {
    chai
      .request(server)
      .delete('/api/v1/wines/1')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.message.should.be.a('string');
        response.body.message.should.equal('Successful deletion of Wine');
        done();
      });
  });

  it('DELETE /api/v1/wines/:wine_id should remove a wine SAD', done => {
    chai
      .request(server)
      .delete('/api/v1/wines/3333')
      .end((err, response) => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.error.should.be.a('string');
        response.body.error.should.equal('Could not find Vitis Vinifera.');
        done();
      });
  });
});
