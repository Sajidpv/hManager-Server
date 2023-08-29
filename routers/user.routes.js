const router = require('express').Router();

const UserController = require("../controller/user.controller");

router.post('/registration', UserController.register);

router.post('/login', UserController.login);

router.get('/get_employee', UserController.getEmployee);

router.get('/get_employee_by_id/:id', UserController.getEmployeeById);

router.post('/update_employee_status/:id', UserController.updateStatus);

router.delete('/delete_user/:id', UserController.deleteUser);

module.exports = router;
