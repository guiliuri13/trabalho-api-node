var express = require('express');
var router = express.Router();
const PontoController = require('../controller/PontoController.js');

router.get('/', function(req, res, next) {
  PontoController.listPontos(req, res)
});

router.get('/employee/:id', function(req, res, next) {
  PontoController.listPontosByEmployee(req, res)
});

router.post('/create', function(req, res, next) {
  PontoController.createPonto(req, res)
});

router.post('/update/:id', function(req, res, next) {
  PontoController.updatePonto(req, res)
});

router.post('/delete', function(req, res, next) {
  PontoController.deletePonto(req, res)
});

router.post('/get', function(req, res, next) {
  PontoController.getPonto(req, res)
});

module.exports = router;
