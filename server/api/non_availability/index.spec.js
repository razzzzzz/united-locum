'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var non_availabilityCtrlStub = {
  index: 'non_availabilityCtrl.index',
  show: 'non_availabilityCtrl.show',
  create: 'non_availabilityCtrl.create',
  update: 'non_availabilityCtrl.update',
  destroy: 'non_availabilityCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var non_availabilityIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './non_availability.controller': non_availabilityCtrlStub
});

describe('Non_availability API Router:', function() {

  it('should return an express router instance', function() {
    non_availabilityIndex.should.equal(routerStub);
  });

  describe('GET /api/non_availabilitys', function() {

    it('should route to profile.controller.index', function() {
      routerStub.get
        .withArgs('/', 'non_availabilityCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/non_availabilitys/:id', function() {

    it('should route to non_availability.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'non_availabilityCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/non_availabilitys', function() {

    it('should route to non_availability.controller.create', function() {
      routerStub.post
        .withArgs('/', 'non_availabilityCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/non_availabilitys/:id', function() {

    it('should route to non_availability.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'non_availabilityCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/non_availabilitys/:id', function() {

    it('should route to non_availability.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'non_availabilityCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/non_availabilitys/:id', function() {

    it('should route to non_availability.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'non_availabilityCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
