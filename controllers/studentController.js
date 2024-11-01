// Importing MySQL connection
const db = require('../config/db');

// Render the student login page
const student_login_get = (req, res) => {
    res.render("student/login");
};

// Function to calculate CGPA
// Function to calculate CGPA (normalized to 10)
const calculateCGPA = (scores) => {
    const totalSubjects = 5; // Total number of subjects
    const maxScore = 100; // Assuming the maximum score for each subject is 100

    // Sum the scores, defaulting to 0 if undefined
    const totalScore = (scores.dbms || 0) + (scores.professional_elective || 0) + (scores.open_elective || 0) + (scores.flat || 0) + (scores.cn || 0);

    // Calculate CGPA (normalized to a scale of 10)
    const cgpa = (totalScore / (totalSubjects * maxScore)) * 10;
    return parseFloat(cgpa.toFixed(2)); // Return CGPA rounded to two decimal places
};


// Handle student login (POST)
const student_login_post = (req, res) => {
    const Sturoll = req.body.roll;

    // Query to find the student by roll number in MySQL
    db.query('SELECT * FROM students WHERE roll = ?', [Sturoll], (err, results) => {
        if (err) {
            return res.status(500).send("Database error");
        }

        // Check if the student was found
        if (results.length === 0) {
            return res.render('student/login', { error: 'Login with correct roll number' });
        }

        // Extract the individual student from the results
        const individualStudent = results[0];

        // Calculate CGPA
        const cgpa = calculateCGPA(individualStudent);

        // Render the student's view page with the student data and CGPA
        res.render('student/view', { one: individualStudent, cgpa: cgpa });
    });
};

// Exporting student controller functions
module.exports = {
    student_login_get,
    student_login_post
};
