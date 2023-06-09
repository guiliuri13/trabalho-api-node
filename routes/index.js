var express = require('express');
var router = express.Router();
const EmployeeController = require('../controller/EmployeeController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  EmployeeController.listEmployees(req, res)
});

module.exports = router;
