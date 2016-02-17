'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var dairyCtrlStub = {
  index: 'dairyCtrl.index',
  show: 'dairyCtrl.show',
  create: 'dairyCtrl.create',
  update: 'dairyCtrl.update',
  destroy: 'dairyCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var dairyIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './dairy.controller': dairyCtrlStub
});

describe('Dairy API Router:', function() {

  it('should return an express router instance', function() {
    dairyIndex.should.equal(routerStub);
  });

  describe('GET /api/dairys', function() {

    it('should route to dairy.controller.index', function() {
      routerStub.get
        .withArgs('/', 'dairyCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/dairys/:id', function() {

    it('should route to dairy.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'dairyCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/dairys', function() {

    it('should route to dairy.controller.create', function() {
      routerStub.post
        .withArgs('/', 'dairyCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/dairys/:id', function() {

    it('should route to dairy.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'dairyCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/dairys/:id', function() {

    it('should route to dairy.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'dairyCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/dairys/:id', function() {

    it('should route to dairy.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'dairyCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
