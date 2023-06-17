const { PrismaClient } = require("@prisma/client");
const { DateTime } = require("luxon");

const prisma = new PrismaClient();

class PontoModel {
    async getAllPontos() {
		let returns = [];
		let employees = await prisma.$queryRaw`
			SELECT *
			FROM employee
		`;
		
		if (employees?.length) {
			for (let emp of employees) {
				let pontos = await prisma.$queryRaw`SELECT * FROM pontos WHERE employee_id = ${emp.id}`;
				
				returns.push({ ...emp, pontos });
			}
		}

        return returns;
    }

    async getPontosByEmployee(employee_id) {
        let pontos = await prisma.$queryRaw`
            SELECT *
            FROM pontos
            WHERE employee_id = ${employee_id}
        `;

        if (pontos?.length) {
            for (let ponto of pontos) {
                let employee = await prisma.$queryRaw`SELECT * FROM employee WHERE id = ${ponto.employee_id}`;

                ponto.employee = employee;
            }
        }

        return pontos;
    }

    async createPonto(location, employee_id) {
        let ponto = await prisma.$queryRaw`
            INSERT INTO pontos (location, employee_id, created_at, updated_at)
            VALUES (${location}, ${employee_id}, ${DateTime.now().toSQL()}, ${DateTime.now().toSQL()})
        `;

        return ponto;
    }

    async updatePonto(location, employee_id) {
        let ponto = await prisma.$queryRaw`
            UPDATE pontos
            SET location = ${location}, employee_id = ${employee_id}
            WHERE id = ${id}
        `;

        return ponto;
    }

    async deletePonto(id) {
        let ponto = await prisma.$queryRaw`
            DELETE FROM pontos
            WHERE id = ${id}
        `;

        return ponto;
    }

    async getPonto(id) {
        let ponto = await prisma.$queryRaw`
            SELECT *
            FROM pontos
            WHERE id = ${id}
            LIMIT 1
        `;

        if (ponto?.length) {
            let employee = await prisma.$queryRaw`SELECT * FROM employee WHERE id = ${ponto.employee_id}`;

            ponto.employee = employee;
        }

        return ponto;
    }
}

module.exports = new PontoModel();