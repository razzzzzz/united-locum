'use strict';

var app = require('../..');
import request from 'supertest';

var newNon_availability;

describe('non_availability API:', function() {

  describe('GET /api/non_availabilitys', function() {
    var non_availabilitys;

    beforeEach(function(done) {
      request(app)
        .get('/api/non_availabilitys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          non_availabilitys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      non_availabilitys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/non_availabilitys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/non_availabilitys')
        .send({
          name: 'New Non_availability',
          info: 'This is the brand new non_availability!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newNon_availability = res.body;
          done();
        });
    });

    it('should respond with the newly created non_availability', function() {
      newNon_availability.name.should.equal('New Non_availability');
      newNon_availability.info.should.equal('This is the brand new non_availability!!!');
    });

  });

  describe('GET /api/non_availabilitys/:id', function() {
    var non_availability;

    beforeEach(function(done) {
      request(app)
        .get('/api/non_availabilitys/' + newNon_availability._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          non_availability = res.body;
          done();
        });
    });

    afterEach(function() {
      non_availability = {};
    });

    it('should respond with the requested non_availability', function() {
      non_availability.name.should.equal('New Non_availability');
      non_availability.info.should.equal('This is the brand new non_availability!!!');
    });

  });

  describe('PUT /api/non_availabilitys/:id', function() {
    var updatedNon_availability;

    beforeEach(function(done) {
      request(app)
        .put('/api/non_availabilitys/' + newNon_availability._id)
        .send({
          name: 'Updated Non_availability',
          info: 'This is the updated non_availability!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedNon_availability = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedNon_availability = {};
    });

    it('should respond with the updated non_availability', function() {
      updatedNon_availability.name.should.equal('Updated Non_availability');
      updatedNon_availability.info.should.equal('This is the updated non_availability!!!');
    });

  });

  describe('DELETE /api/non_availabilitys/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/non_availabilitys/' + newNon_availability._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when non_availability does not exist', function(done) {
      request(app)
        .delete('/api/non_availabilitys/' + newNon_availability._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
