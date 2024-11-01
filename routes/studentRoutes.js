const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Route to display the login page (GET)
router.get('/login', studentController.student_login_get);

// Route to handle login form submission (POST)
router.post('/login', studentController.student_login_post);

module.exports = router;
