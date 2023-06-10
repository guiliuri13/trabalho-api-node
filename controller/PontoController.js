const PontoModel = require('../model/PontoModel');

class PontoController {
    async listPontos(req, res) {
        let pts = await PontoModel.getAllPontos();

        res.json(pts);
    }

    async createPonto(req, res) {
        let {
            location,
            employee_id
        } = req.body;

        let pts = await PontoModel.createPonto(location, employee_id);

        res.json(pts);
    }

    async updatePonto(req, res) {
        let { location, employee_id } = req.body;

        let pts = await PontoModel.updatePonto(location, employee_id);

        res.json(pts);
    }

    async deletePonto(req, res) {
        let { id } = req.body;

        let pts = await PontoModel.deletePonto(id);

        res.json(pts);
    }

    async getPonto(req, res) {
        let { id } = req.body;

        let pts = await PontoModel.getPonto(id);

        res.json(pts);
    }
}

module.exports = new PontoController();