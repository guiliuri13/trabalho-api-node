var express = require("express");
var router = express.Router();
const EmployerController = require("../controller/EmployerController.js");

router.get("/", function (req, res, next) {
  EmployerController.listEmployers(req, res);
});

router.post("/create", function (req, res, next) {
  EmployerController.createEmployer(req, res);
});

router.put("/update", function (req, res, next) {
  EmployerController.updateEmployer(req, res);
});

router.delete("/delete", function (req, res, next) {
  EmployerController.deleteEmployer(req, res);
});

router.get("/get", function (req, res, next) {
  EmployerController.getEmployer(req, res);
});

router.get("/points", function (req, res, next) {
  EmployerController.getPoints(req, res);
});

router.put("/point/:employee", function (req, res, next) {
  EmployerController.adjustPoint(req, res);
});

module.exports = router;
