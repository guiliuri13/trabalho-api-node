const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class EmployeeModel {
  async getAllEmployees() {
    let returns = [];
    let employees = await prisma.$queryRaw`
            SELECT employee.* pontos.*
            FROM employee
        `;

    if (employees?.length) {
      for (emp of employees) {
        let pontos =
          await prisma.$queryRaw`SELECT * FROM pontos WHERE employee_id = ${emp.id}`;

        returns.push({ ...emp, pontos });
      }
    }

    return returns;
  }

  async createEmployee(name, is_pj, employer_id) {
    let employee = await prisma.employee
      .create({
        data: {
          name,
          is_pj,
          employer_id,
        },
      })
      .catch((err) => {
        console.log(err);
      });

    return employee;
  }

  async updateEmployee(id, name, email, phone) {
    let employee = await prisma.employee.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        phone: phone,
      },
    });

    return employee;
  }

  async deleteEmployee(id) {
    let employee = await prisma.employee.delete({
      where: {
        id: id,
      },
    });

    return employee;
  }

  async getEmployee(id) {
    let employee = await prisma.employee.findUnique({
      where: {
        id: id,
      },
      include: {
        pontos: true,
      },
    });

    return employee;
  }
}

module.exports = new EmployeeModel();
