// Import MySQL connection
const db = require('../config/db');
const bcrypt = require('bcrypt'); // Use bcrypt for password hashing

// Rendering the teacher login page
const teacher_login_get = (req, res) => {
    res.render("teacher/teacherLogin", { error: null });
};

// Teacher login POST request handler
const teacher_login_post = (req, res) => {
    const sql = 'SELECT * FROM teachers WHERE email = ?';
    db.query(sql, [req.body.email], (err, results) => {
        if (err) {
            console.error("Database error during login:", err);
            return res.status(500).send("Database error");
        }

        if (results.length > 0 && bcrypt.compareSync(req.body.password, results[0].password)) {
            // Successful login, redirect to the teacher options page
            res.redirect("/teacher/option");
        } else {
            // Invalid credentials, re-render login page with error
            res.render("teacher/teacherLogin", {
                error: "Invalid email or password"
            });
        }
    });
};

// Fetch all students and render the view all page
const teacher_viewall_get = (req, res) => {
    const query = "SELECT * FROM students";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).send("Database error");
        }
        res.render("teacher/viewall", { students: results });
    });
};

// Get student data for editing by roll and render edit page
const teacher_edit_get = (req, res) => {
    const roll = req.params.roll; // Ensure we are getting the roll parameter
    console.log("Editing student with roll number:", roll); // Debugging log
    const query = "SELECT * FROM students WHERE roll = ?";
    db.query(query, [roll], (err, results) => {
        if (err) {
            console.error("Error fetching student for edit:", err);
            return res.status(500).send("Database error");
        }
        if (results.length === 0) {
            return res.status(404).send("Student not found"); // More detailed error message
        }
        res.render("teacher/edit", { student: results[0] }); // Render the edit page with the student data
    });
};

// Update student data after editing (POST request)
const teacher_edit_post = (req, res) => {
    const { name, dob, dbms, professional_elective, open_elective, flat, cn } = req.body;
    const roll = req.params.roll;

    // Set default values if fields are empty
    const dbmsScore = dbms || 0;
    const professionalElectiveScore = professional_elective || 0;
    const openElectiveScore = open_elective || 0;
    const flatScore = flat || 0;
    const cnScore = cn || 0;

    const updateQuery = `
        UPDATE students 
        SET name = ?, dob = ?, dbms = ?, professional_elective = ?, open_elective = ?, flat = ?, cn = ?
        WHERE roll = ?`;

    db.query(updateQuery, [name, dob, dbmsScore, professionalElectiveScore, openElectiveScore, flatScore, cnScore, roll], (error) => {
        if (error) {
            console.error("Error updating student data:", error);
            return res.status(500).send("Oooopss !! Error updating student data");
        }
        res.redirect("/teacher/viewall");
    });
};

// Delete student by ID
const teacher_delete_get = (req, res) => {
    const roll = req.params.roll;
    console.log("Deleting student with roll:", roll); // Log the student ID
    const query = "DELETE FROM students WHERE roll = ?";
    db.query(query, [roll], (err) => {
        if (err) {
            console.error("Error deleting student:", err);
            return res.status(500).send("Database error");
        }
        res.redirect("/teacher/viewall"); // Redirect to view all students
    });
};

// Render the teacher options page
const teacher_option_get = (req, res) => {
    res.render("teacher/option");
};

// Render the add student form
const teacher_add_get = (req, res) => {
    res.render("teacher/addstudent", { error: null }); // Pass error as null initially
};

// Add a new student to the database
// Add a new student to the database
const teacher_add_post = (req, res) => {
    const { name, roll, dob, dbms, professional_elective, open_elective, flat, cn } = req.body;

    // Check if student already exists by roll number
    const checkQuery = "SELECT * FROM students WHERE roll = ?";
    db.query(checkQuery, [roll], (err, results) => {
        if (err) {
            console.error("Error checking if student exists:", err);
            return res.status(500).send("Database error");
        }

        if (results.length > 0) {
            // Student with this roll number already exists
            return res.render('teacher/addstudent', { error: "Student with this roll number already exists" });
        }

        // If student doesn't exist, insert into the database
        const insertQuery = `
            INSERT INTO students (name, roll, dob, dbms, professional_elective, open_elective, flat, cn) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            
        db.query(insertQuery, [name, roll, dob, dbms, professional_elective, open_elective, flat, cn], (err) => {
            if (err) {
                console.error("Error inserting new student:", err);
                return res.status(500).send("Database error");
            }
            // Redirect to view all students or show success message
            res.redirect("/teacher/viewall");
        });
    });
};


// Render the teacher sign-up page
const teacher_signup_get = (req, res) => {
    res.render('teacher/signup', { error: null });
};

// Handle sign-up form submission
const teacher_signup_post = (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password

    const sql = 'INSERT INTO teachers (email, password) VALUES (?, ?)';
    db.query(sql, [email, hashedPassword], (err) => {
        if (err) {
            console.error("Error during teacher signup:", err);
            return res.status(500).send("Database error");
        }
        res.redirect('/teacher/login');
    });
};

// Exporting teacher controller functions
module.exports = {
    teacher_signup_get,
    teacher_signup_post,
    teacher_login_get,
    teacher_login_post,
    teacher_viewall_get,
    teacher_edit_get,
    teacher_edit_post,
    teacher_delete_get,
    teacher_add_post,
    teacher_add_get,
    teacher_option_get
};
