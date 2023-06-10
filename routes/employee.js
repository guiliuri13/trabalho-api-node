var express = require('express');
var router = express.Router();
const EmployeeController = require('../controller/EmployeeController.js');

router.get('/', function(req, res, next) {
  EmployeeController.listEmployees(req, res)
});

router.post('/create', function(req, res, next) {
  EmployeeController.createEmployee(req, res)
});

router.post('/update', function(req, res, next) {
  EmployeeController.updateEmployee(req, res)
});

router.post('/delete', function(req, res, next) {
  EmployeeController.deleteEmployee(req, res)
});

router.post('/get', function(req, res, next) {
  EmployeeController.getEmployee(req, res)
});

module.exports = router;
