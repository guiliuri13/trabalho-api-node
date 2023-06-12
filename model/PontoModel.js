const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class PontoModel {
    async getAllPontos() {
        let pontos = await prisma.pontos.findMany();

        return pontos;
    }

    async getPontosByEmployee(employee_id) {
        let pontos = await prisma.pontos.findMany({
            where: {
                employee_id: employee_id
            }
        });

        return pontos;
    }

    async createPonto(location, employee_id) {
        let ponto = await prisma.pontos.create({
            data: {
                location,
                employee_id
            }
        }).catch((err) => {
            console.log(err);
        });

        return ponto;
    }

    async updatePonto(location, employee_id) {
        let ponto = await prisma.pontos.update({
            where: {
                id: id
            },
            data: {
                location,
                employee_id
            }
        });

        return ponto;
    }

    async deletePonto(id) {
        let ponto = await prisma.pontos.delete({
            where: {
                id: id
            }
        });

        return ponto;
    }

    async getPonto(id) {
        let ponto = await prisma.pontos.findUnique({
            where: {
                id: id
            }
        });

        return ponto;
    }
}

module.exports = new PontoModel();