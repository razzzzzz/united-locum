'use strict';

var app = require('../..');
import request from 'supertest';

var newVacancy;

describe('Vacancy API:', function() {

  describe('GET /api/vacancys', function() {
    var vacancys;

    beforeEach(function(done) {
      request(app)
        .get('/api/vacancys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          vacancys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      vacancys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/vacancys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/vacancys')
        .send({
          name: 'New Vacancy',
          info: 'This is the brand new vacancy!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newVacancy = res.body;
          done();
        });
    });

    it('should respond with the newly created vacancy', function() {
      newVacancy.name.should.equal('New Vacancy');
      newVacancy.info.should.equal('This is the brand new vacancy!!!');
    });

  });

  describe('GET /api/vacancys/:id', function() {
    var vacancy;

    beforeEach(function(done) {
      request(app)
        .get('/api/vacancys/' + newVacancy._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          vacancy = res.body;
          done();
        });
    });

    afterEach(function() {
      vacancy = {};
    });

    it('should respond with the requested vacancy', function() {
      vacancy.name.should.equal('New Vacancy');
      vacancy.info.should.equal('This is the brand new vacancy!!!');
    });

  });

  describe('PUT /api/vacancys/:id', function() {
    var updatedVacancy;

    beforeEach(function(done) {
      request(app)
        .put('/api/vacancys/' + newVacancy._id)
        .send({
          name: 'Updated Vacancy',
          info: 'This is the updated vacancy!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedVacancy = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedVacancy = {};
    });

    it('should respond with the updated vacancy', function() {
      updatedVacancy.name.should.equal('Updated Vacancy');
      updatedVacancy.info.should.equal('This is the updated vacancy!!!');
    });

  });

  describe('DELETE /api/vacancys/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/vacancys/' + newVacancy._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when vacancy does not exist', function(done) {
      request(app)
        .delete('/api/vacancys/' + newVacancy._id)
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
