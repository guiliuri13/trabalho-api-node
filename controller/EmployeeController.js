class EmployeeController {
    async listEmployees(req, res) {
        console.log('listEmployees')
        res.send('listEmployees')
    }
}

module.exports = new EmployeeController();