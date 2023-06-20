const ManagerModel = require('../model/ManagerModel');

class ManagerController {
    async listManagers(req, res) {
        let mgrs = await ManagerModel.getAllManagers();

        res.json(mgrs);
    }

    async listManagersByEmployer(req, res) {
        let { id } = req.params;

        let mgrs = await ManagerModel.getManagersByEmployer(id);

        res.json(mgrs);

    }

    async createManager(req, res) {
        let {
            name,
            employer_id,
        } = req.body;

        let emp = await ManagerModel.createManager(name, employer_id);

        res.json(emp);
    }

    async updateManager(req, res) {
        let { id, name } = req.body;

        let emp = await ManagerModel.updateManager(id, name);

        res.json(emp);
    }

    async deleteManager(req, res) {
        let { id } = req.body;

        let emp = await ManagerModel.deleteManager(id);

        res.json(emp);
    }

    async getManager(req, res) {
        let { id } = req.body;

        console.log(id)
        let emp = await ManagerModel.getManager(id);

        res.json(emp);
    }
}

module.exports = new ManagerController();