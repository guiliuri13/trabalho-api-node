var express = require('express');
var router = express.Router();
const EmployeeController = require('../controller/EmployeeController.js');

router.get('/', function(req, res, next) {
  EmployeeController.listEmployees(req, res)
});

router.post('/create', function(req, res, next) {
  EmployeeController.createEmployee(req, res)
});

router.put('/update', function(req, res, next) {
  EmployeeController.updateEmployee(req, res)
});

router.delete('/delete', function(req, res, next) {
  EmployeeController.deleteEmployee(req, res)
});

router.get('/get', function(req, res, next) {
  EmployeeController.getEmployee(req, res)
});

module.exports = router;
