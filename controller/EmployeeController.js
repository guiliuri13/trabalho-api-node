const EmployeeModel = require('../model/EmployeeModel');

class EmployeeController {
    async listEmployees(req, res) {
        let emps = await EmployeeModel.getAllEmployees();

        res.json(emps);
    }

    async createEmployee(req, res) {
        let {
            name,
            is_pj,
            employer_id,
        } = req.body;

        let emp = await EmployeeModel.createEmployee(name, is_pj, employer_id);

        res.json(emp);
    }

    async updateEmployee(req, res) {
        let { id, name, email, phone } = req.body;

        let emp = await EmployeeModel.updateEmployee(id, name, email, phone);

        res.json(emp);
    }

    async deleteEmployee(req, res) {
        let { id } = req.body;

        let emp = await EmployeeModel.deleteEmployee(id);

        res.json(emp);
    }

    async getEmployee(req, res) {
        let { id } = req.body;

        let emp = await EmployeeModel.getEmployee(id);

        res.json(emp);
    }
}

module.exports = new EmployeeController();