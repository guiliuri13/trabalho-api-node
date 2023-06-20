const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class EmployeeModel {
	async getAllEmployees() {
		let returns = [];
		let employees = await prisma.$queryRaw`
			SELECT *
			FROM employee
		`;

		if (employees?.length) {
			for (let emp of employees) {
				let pontos = await prisma.$queryRaw`
					SELECT id, location, DATETIME(created_at)
					FROM Pontos
					WHERE employee_id = ${emp.id}
				`;
				
				returns.push({ ...emp, pontos });
			}
		}

		return returns;
	}

	async createEmployee(name, is_pj, employer_id) {
		let employee = await prisma.$queryRaw`
			INSERT INTO employee (name, is_pj, employer_id)
			VALUES (${name}, ${is_pj}, ${employer_id})
		`;
		
		return employee;
	}
	
	async updateEmployee(id, name, email, phone) {
		let employee = await prisma.$queryRaw`
			UPDATE employee
			SET name = ${name}, email = ${email}, phone = ${phone}
			WHERE id = ${id}
		`;

		return employee;
	}
	
	async deleteEmployee(id) {
		// delete pontos
		await prisma.$queryRaw`
			DELETE FROM pontos
			WHERE employee_id = ${id}
		`;
	
		let employee = await prisma.$queryRaw`
			DELETE FROM employee
			WHERE id = ${id}
		`;

		return employee;
	}
	
	async getEmployee(id) {
		let employee = await prisma.$queryRaw`
			SELECT *
			FROM employee
			WHERE id = ${id}
			LIMIT 1
		`;

		if (employee?.length) {
			let pontos = await prisma.$queryRaw`
				SELECT id, location, DATETIME(created_at)
				FROM Pontos
				WHERE employee_id = ${employee[0].id}
			`;

			employee[0].pontos = pontos;
		}

		return employee;
	}
}

module.exports = new EmployeeModel();
