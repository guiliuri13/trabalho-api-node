var express = require('express');
var router = express.Router();
const ManagerController = require('../controller/ManagerController.js');

router.get('/', function(req, res, next) {
  ManagerController.listManagers(req, res)
});

router.get('/employer/:id', function(req, res, next) {
  ManagerController.listManagersByEmployer(req, res)
});

router.post('/create', function(req, res, next) {
  ManagerController.createManager(req, res)
});

router.put('/update', function(req, res, next) {
  ManagerController.updateManager(req, res)
});

router.post('/delete', function(req, res, next) {
  ManagerController.deleteManager(req, res)
});

router.post('/get', function(req, res, next) {
  ManagerController.getManager(req, res)
});

module.exports = router;
