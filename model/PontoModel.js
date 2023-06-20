const { PrismaClient } = require("@prisma/client");
const { DateTime } = require("luxon");

const prisma = new PrismaClient();

class PontoModel {
    async getAllPontos() {
		let returns = [];

        try {
            let employees = await prisma.$queryRaw`
                SELECT *
                FROM employee
            `;

            try {
                if (employees?.length) {
                    for (let emp of employees) {
                        // created at as a date
                        let pontos = await prisma.$queryRaw`
                            SELECT id, location, DATETIME(created_at)
                            FROM Pontos
                            WHERE employee_id = ${emp.id}
                        `;
                        
                        returns.push({ ...emp, pontos });
                    }
                }

                console.log('RETURN', returns);
                return returns;
            } catch (error) {
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    async getPontosByEmployee(employee_id) {
        let pontos = await prisma.$queryRaw`
            SELECT id, location, DATETIME(created_at)
            FROM Pontos
            WHERE employee_id = ${employee_id}
        `;

        return pontos;
    }

    async createPonto(location, employee_id) {
        let ponto = await prisma.$queryRaw`
            INSERT INTO pontos (location, employee_id, created_at, updated_at)
            VALUES (${location}, ${employee_id}, ${DateTime.now().toSQL()}, ${DateTime.now().toSQL()})
        `;

        return ponto;
    }

    async updatePonto(id, location, employee_id, new_date) {
        let ponto = await prisma.$queryRaw`
            UPDATE pontos
            SET location = ${location}, employee_id = ${employee_id}, created_at = ${new_date}, updated_at = ${DateTime.now().toSQL()}
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
            SELECT id, location, DATETIME(created_at)
            FROM Pontos
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