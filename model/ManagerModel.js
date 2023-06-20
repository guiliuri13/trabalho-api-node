const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class ManagerModel {
	async getAllManagers() {
		let managers = await prisma.$queryRaw`
			SELECT *
			FROM manager
		`;

		return managers;
	}
	
	async createManager(name, employer_id) {
		let manager = await prisma.$queryRaw`
			INSERT INTO manager (name, employer_id)
			VALUES (${name}, ${employer_id})
		`;
		
		return manager;
	}
	
	async updateManager(id, name) {
		let manager = await prisma.$queryRaw`
			UPDATE manager
			SET name = ${name}
			WHERE id = ${id}
		`;

		return manager;
	}
	
	async deleteManager(id) {
		let manager = await prisma.$queryRaw`
			DELETE FROM manager
			WHERE id = ${id}
		`;

		return manager;
	}
	
	async getManager(id) {
		let manager = await prisma.$queryRaw`
			SELECT name, employer_id
			FROM manager
			WHERE id = ${id}
			LIMIT 1
		`;

		return manager;
	}
	
	async getManagersByEmployer(id) {
		let manager = await prisma.$queryRaw`
			SELECT name, employer_id
			FROM manager
			WHERE employer_id = ${id}
		`;

		return manager;
	}
}

module.exports = new ManagerModel();
