const express = require("express");
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const mysql = require('mysql'); // MySQL for database connection
const expressLayouts = require('express-ejs-layouts'); // For using layouts in EJS
const app = express();const bodyParser = require('body-parser');
const teacherControllers = require('./controllers/teacherController'); // Adjust the path
const port = 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Session middleware setup
app.use(session({
    secret: 'your_secure_secret_key_here', // replace with a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // set to true if using https
}));
app.use(methodOverride('_method'));
// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '04082004@DJj',
    database: process.env.DB_NAME || 'studentresultmanagementDB'
  });
  
// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1); // Terminate the process if the connection fails
    }
    console.log('Connected to MySQL!');
});
app.get('/teacher/addstudent', teacherControllers.teacher_add_get);
app.post('/teacher/addstudent', teacherControllers.teacher_add_post);

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for serving static files and parsing request bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express layouts for EJS
app.use(expressLayouts);
app.set('layout', 'layouts/layout'); // Set the default layout

// Teacher and student routes
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
app.use("/teacher", teacherRoutes);
app.use("/student", studentRoutes);

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

// 404 page handling
app.use((req, res) => {
    res.status(404).render('404', { title: '404 Not Found' });
});

// Listen on the specified port
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
