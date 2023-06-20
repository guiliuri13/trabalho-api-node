const EmployerModel = require("../model/EmployerModel");

class EmployerController {
  async listEmployers(_, res) {
    let emps = await EmployerModel.getAllEmployers();

    res.json(emps);
  }

  async createEmployer(req, res) {
    let { name, has_hour_base } = req.body;

    let emp = await EmployerModel.createEmployer(name, has_hour_base);

    res.json(emp);
  }

  async updateEmployer(req, res) {
    let { id, name, has_hour_base } = req.body;

    let emp = await EmployerModel.updateEmployer(id, name, has_hour_base);

    res.json(emp);
  }

  async deleteEmployer(req, res) {
    let { id } = req.body;

    let emp = await EmployerModel.deleteEmployer(id);

    res.json(emp);
  }

  async getEmployer(req, res) {
    let { id } = req.body;

    let emp = await EmployerModel.getEmployer(id);

    res.json(emp);
  }

  async getPoints(req, res) {
    let { employer_id, employee_id } = req.body;

    let emp = await EmployerModel.getPoints(employer_id, employee_id);

    res.json(emp);
  }

  async adjustPoint(req, res) {
    let { id, date } = req.body;
    let { employee } = req.params;

    let emp = await EmployerModel.adjustPoint(Number(employee), id, date);

    res.json(emp);
  }
}

module.exports = new EmployerController();
