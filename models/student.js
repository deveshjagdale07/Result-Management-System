// Import MySQL connection
const db = require('../config/db');

// Create a Student class that will handle database operations
class Student {
    // Fetch a single student by roll number
    static findByRoll(roll, callback) {
        const query = 'SELECT * FROM students WHERE roll = ?';
        db.query(query, [roll], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, result[0]); // Assuming only one student is fetched
        });
    }

    // Fetch all students
    static findAll(callback) {
        const query = 'SELECT * FROM students';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results);
        });
    }

    // Fetch a single student by ID
    static findById(id, callback) {
        const query = 'SELECT * FROM students WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, result[0]);
        });
    }

    // Update a student by ID
    static updateById(id, updatedData, callback) {
        const { name, roll, dob, score } = updatedData;
        const query = 'UPDATE students SET name = ?, roll = ?, dob = ?, score = ? WHERE id = ?';
        db.query(query, [name, roll, dob, score, id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, result);
        });
    }

    // Delete a student by ID
    static deleteById(id, callback) {
        const query = 'DELETE FROM students WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, result);
        });
    }

    // Add a new student
    static add(newStudentData, callback) {
        const { name, roll, dob, score } = newStudentData;
        const query = 'INSERT INTO students (name, roll, dob, score) VALUES (?, ?, ?, ?)';
        db.query(query, [name, roll, dob, score], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, result);
        });
    }
}

module.exports = Student;
