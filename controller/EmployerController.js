const EmployerModel = require('../model/EmployerModel');

class EmployerController {
    async listEmployers(req, res) {
        let emps = await EmployerModel.getAllEmployers();

        res.json(emps);
    }

    async createEmployer(req, res) {
        let {
            name,
            has_hour_base
        } = req.body;

        let emp = await EmployerModel.createEmployer(name, has_hour_base);

        res.json(emp);
    }

    async updateEmployer(req, res) {
        let { name, has_hour_base } = req.body;

        let emp = await EmployerModel.updateEmployer(name, has_hour_base);

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
}

module.exports = new EmployerController();