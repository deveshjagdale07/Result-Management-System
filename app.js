const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const teacherControllers = require("./controllers/teacherController"); // Adjust the path if necessary
const db = require("./config/db"); // Use the db.js file for a single database connection

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set("layout", "layouts/layout");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => res.render("index"));
app.use("/teacher", require("./routes/teacherRoutes"));
app.use("/student", require("./routes/studentRoutes"));
app.get("/teacher/addstudent", teacherControllers.teacher_add_get);
app.post("/teacher/addstudent", teacherControllers.teacher_add_post);

// 404 Page
app.use((req, res) => res.status(404).render("404", { title: "404 Not Found" }));

// Start server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
