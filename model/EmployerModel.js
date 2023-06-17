const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class EmployerModel {
    async getAllEmployers() {
        let employer = await prisma.$queryRaw`
            SELECT *
            FROM employer
        `;

        if (employer?.length) {
            for (let emp of employer) {
                let employees = await prisma.$queryRaw`SELECT * FROM employee WHERE employer_id = ${emp.id}`;

                emp.employees = employees;
            }
        }

        return employer;
    }

    async createEmployer(name, has_hour_base) {
        let employer = await prisma.$queryRaw`
            INSERT INTO employer (name, has_hour_base)
            VALUES (${name}, ${has_hour_base})
        `;

        return employer;
    }

    async updateEmployer(name, has_hour_base) {
        let employer = await prisma.$queryRaw`
            UPDATE employer
            SET name = ${name}, has_hour_base = ${has_hour_base}
            WHERE id = ${id}
        `;

        return employer;
    }

    async deleteEmployer(id) {
        let employer = await prisma.$queryRaw`
            DELETE FROM employer
            WHERE id = ${id}
        `;

        return employer;
    }

    async getEmployer(id) {
        let employer = await prisma.$queryRaw`
            SELECT *
            FROM employer
            WHERE id = ${id}
            LIMIT 1
        `;

        if (employer?.length) {
            let employees = await prisma.$queryRaw`SELECT * FROM employee WHERE employer_id = ${employer[0].id}`;

            employer[0].employees = employees;
        }

        return employer;
    }
}

module.exports = new EmployerModel();