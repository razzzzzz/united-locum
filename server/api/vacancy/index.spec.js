'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var vacancyCtrlStub = {
  index: 'vacancyCtrl.index',
  show: 'vacancyCtrl.show',
  create: 'vacancyCtrl.create',
  update: 'vacancyCtrl.update',
  destroy: 'vacancyCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var vacancyIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './vacancy.controller': vacancyCtrlStub
});

describe('Vacancy API Router:', function() {

  it('should return an express router instance', function() {
    vacancyIndex.should.equal(routerStub);
  });

  describe('GET /api/vacancys', function() {

    it('should route to vacancy.controller.index', function() {
      routerStub.get
        .withArgs('/', 'vacancyCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/vacancys/:id', function() {

    it('should route to vacancy.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'vacancyCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/vacancys', function() {

    it('should route to vacancy.controller.create', function() {
      routerStub.post
        .withArgs('/', 'vacancyCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/vacancys/:id', function() {

    it('should route to vacancy.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'vacancyCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/vacancys/:id', function() {

    it('should route to vacancy.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'vacancyCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/vacancys/:id', function() {

    it('should route to vacancy.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'vacancyCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
