const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class EmployerModel {
    async getAllEmployers() {
        let employer = await prisma.employer.findMany({
            include: {
                employees: true
            }
        });

        return employer;
    }

    async createEmployer(name, has_hour_base) {
        let employer = await prisma.employer.create({
            data: {
                name,
                has_hour_base
            }
        }).catch((err) => {
            console.log(err);
        });

        return employer;
    }

    async updateEmployer(name, has_hour_base) {
        let employer = await prisma.employer.update({
            where: {
                id
            },
            data: {
                name,
                has_hour_base
            }
        });

        return employer;
    }

    async deleteEmployer(id) {
        let employer = await prisma.employer.delete({
            where: {
                id
            }
        });

        return employer;
    }

    async getEmployer(id) {
        let employer = await prisma.employer.findUnique({
            where: {
                id
            }
        });

        return employer;
    }
}

module.exports = new EmployerModel();