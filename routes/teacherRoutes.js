var express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Teacher sign-up routes
router.get('/signup', teacherController.teacher_signup_get);
router.post('/signup', teacherController.teacher_signup_post);

router.get('/login',teacherController.teacher_login_get);
router.post('/login',teacherController.teacher_login_post);
router.get('/viewall',teacherController.teacher_viewall_get);
router.get('/edit/:roll',teacherController.teacher_edit_get);
router.post('/edit/:roll',teacherController.teacher_edit_post);
router.get('/delete/:roll',teacherController.teacher_delete_get);
router.post('/delete/:roll', teacherController.teacher_delete_get);
router.get('/option',teacherController.teacher_option_get);
router.get('/add',teacherController.teacher_add_get);
router.post('/add',teacherController.teacher_add_post);
module.exports = router;