const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class EmployerModel {
  async getAllEmployers() {
    let employer = await prisma.employer.findMany();

    if (employer?.length) {
      for (let emp of employer) {
        let employees = await prisma.employee.findMany({
          where: {
            employer_id: emp.id,
          },
        });

        emp.employees = employees;
      }
    }

    return employer;
  }

  async createEmployer(name, has_hour_base) {
    let employer = await prisma.employer.create({
      data: {
        name,
        has_hour_base,
      },
    });

    return employer;
  }

  async updateEmployer(id, name, has_hour_base) {
    let employer = await prisma.employer.update({
      where: {
        id,
      },
      data: {
        name,
        has_hour_base,
      },
    });

    return employer;
  }

  async deleteEmployer(id) {
    let employer = prisma.employer.delete({
      where: {
        id,
      },
    });

    return employer;
  }

  async getEmployer(id) {
    let employer = await prisma.employer.findUnique({
      where: {
        id,
      },
    });

    if (employer?.id) {
      let employees = await prisma.employee.findMany({
        where: { employer_id: id },
      });

      employer.employees = employees;
    }

    return employer;
  }

  async getPoints(employer_id, employee_id) {
    let employees = await prisma.employee.findMany({
      where: {
        employer_id,
      },
    });

    let points = [];

    if (employees?.length) {
      for (let employee of employees) {
        let point = await prisma.pontos.findMany({
          where: {
            employee_id: employee.id,
          },
        });

        points.push(point);
      }
    }

    return points.flat(1);
  }

  async adjustPoint(employee_id, id, date) {
    await prisma.pontos.updateMany({
      where: {
        employee_id,
        id,
      },
      data: {
        created_at: date,
      },
    });

    let pointsEmployee = await prisma.pontos.findMany({
      where: {
        employee_id,
      },
    });

    return pointsEmployee;
  }
}

module.exports = new EmployerModel();
