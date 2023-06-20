const PontoModel = require('../model/PontoModel');
const EmployeeModel = require('../model/EmployeeModel');

class PontoController {
    async listPontos(req, res) {
        let pts = await PontoModel.getAllPontos();

        res.json(pts);
    }

    async listPontosByEmployee(req, res) {
        let id = +req.params['id'];

        if (isNaN(id)) {
            res.status(400).json({
                error: 'Invalid ID'
            });
            return;
        }

        let pts = await PontoModel.getPontosByEmployee(id);

        res.json(pts);
    }

    async createPonto(req, res) {
        let {
            location,
            employee_id
        } = req.body;

        let pts_of_employee = await PontoModel.getPontosByEmployee(employee_id),
            this_employee = await EmployeeModel.getEmployee(employee_id);

        // se for o terceiro ponto, quer dizer q ele esta voltando do almoço
        // então se ele nao for PJ, deve ter uma hora desde o ultimo ponto

        // se for o quarto, pega as horas totais e ve se for maior q 8 e ele nao for pj, da erro
        // se ele for PJ, n ve nada

        switch (pts_of_employee.length) {
            case 2:
                if (!this_employee.is_pj) {
                    let last_ponto = pts_of_employee[pts_of_employee.length - 1];

                    // se for do mesmo dia, e foi a menos de 1 hora
                    if (last_ponto.created_at.getDate() == new Date().getDate()
                        && last_ponto.created_at.getHours() - new Date().getHours() < 1
                    ) {
                        res.status(400).json({
                            error: 'clt_should_wait_1_hour'
                        });
                        return;
                    }
                }
                break;
            case 3:
                if (!this_employee.is_pj) {
                    let pts = this_employee.pontos.map(p => p.created_at);

                    pts.push(new Date());

                    let total_hour = pts.reduce((cur, all, curIndex, arr) => {
                        if (curIndex % 2 === 1) {
                            // pega a diferença de horas
                            all += cur.getHours() - arr[curIndex - 1].getHours();
                        }
                    }, 0)

                    if (Math.roud(total_hour) > 8) {
                        res.status(400).json({
                            error: 'clt_cannot_work_more_than_8_hours'
                        });
                        return;
                    }
                }

                break;
            default:
                break;
        }

        let pts = await PontoModel.createPonto(location, employee_id);

        res.json(pts);
    }

    async updatePonto(req, res) {
        let { location, employee_id, new_date } = req.body,
            id = +req.params['id'];

        let pts = await PontoModel.updatePonto(id, location, employee_id, new_date);

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