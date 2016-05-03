'use strict';

var express = require('express');
var controller = require('./vacancy.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/getfiltered', controller.getVacancy);
router.put('/:id', controller.update);
router.put('/reqstatus/:id', controller.updateStatus);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
