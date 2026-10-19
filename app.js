// Import Express
const express = require("express");

const app = express();

// EJS setup
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// In-memory data
let sessions = [];

let todos = [];

let goals = [];

// HOME PAGE
app.get("/", (req, res) => {
    res.render("home");
});

// SESSIONS PAGE
app.get("/sessions", (req, res) => {
    const success = req.query.success === "1";

    res.render("sessions", {
        sessions,
        success
    });
});

// TODO PAGE
app.get("/todo", (req, res) => {
    res.render("todo", { todos });
});

// GOALS PAGE
app.get("/goals", (req, res) => {
    res.render("goals", { goals });
});

// SHOW ADD SESSION FORM
app.get("/add-session", (req, res) => {
    res.render("addSession");
});

// POST ROUTE TO ADD SESSION
app.post("/add-session", (req, res) => {

    const newSession = {
        id: Date.now(),
        subject: req.body.subject,
        duration: req.body.duration,
        notes: req.body.notes,
        date: req.body.date
    };

    sessions.push(newSession);

    res.redirect("/sessions?success=1");
});

// DELETE SESSION ROUTE
app.get("/delete-session/:id", (req, res) => {

    const id = Number(req.params.id);

    sessions = sessions.filter(s => s.id !== id);

    res.redirect("/sessions");
});

// EDIT SESSION ROUTE
app.get("/edit-session/:id", (req, res) => {

    const id = Number(req.params.id);

    const session = sessions.find(s => s.id === id);

    res.render("editSession", { session });
});

// UPDATE EDITS ROUTE
app.post("/update-session/:id", (req, res) => {

    const id = Number(req.params.id);

    const session = sessions.find(s => s.id === id);

    session.subject = req.body.subject;
    session.duration = req.body.duration;
    session.notes = req.body.notes;
    session.date = req.body.date;

    res.redirect("/sessions");
});

// SHOW ADD TODO PAGE
app.get("/add-todo", (req, res) => {
    res.render("addTodo", { todos });
});

// ADD TODO
app.post("/add-todo", (req, res) => {

    const newTodo = {
        task: req.body.task,
        description: req.body.description,
        deadline: req.body.deadline
    };

    todos.push(newTodo);

    res.redirect("/todo");
});

// SHOW EDIT TODO PAGE
app.get("/edit/:index", (req, res) => {

    const index = req.params.index;

    res.render("editTodo", {
        todo: todos[index],
        index
    });
});

// UPDATE TODO
app.post("/edit/:index", (req, res) => {

    const index = req.params.index;

    todos[index] = {
        task: req.body.task,
        description: req.body.description,
        deadline: req.body.deadline
    };

    res.redirect("/todo");
});

// DELETE TODO
app.get("/delete/:index", (req, res) => {

    const index = req.params.index;

    todos.splice(index, 1);

    res.redirect("/todo");
});

// SHOW ADD GOAL PAGE
app.get("/add-goal", (req, res) => {
    res.render("addGoal");
});

// ADD GOAL
app.post("/add-goal", (req, res) => {

    const newGoal = {
        id: Date.now(),
        title: req.body.title,
        targetDate: req.body.targetDate,
        description: req.body.description,
        featured: req.body.featured === "on"
    };

    goals.push(newGoal);

    res.redirect("/goals");
});

// DELETE GOAL
app.get("/delete-goal/:id", (req, res) => {

    const id = Number(req.params.id);

    goals = goals.filter(g => g.id !== id);

    res.redirect("/goals");
});

// SHOW EDIT GOAL PAGE
app.get("/edit-goal/:id", (req, res) => {

    const id = Number(req.params.id);

    const goal = goals.find(g => g.id === id);

    res.render("editGoal", { goal });
});

// UPDATE GOAL
app.post("/update-goal/:id", (req, res) => {

    const id = Number(req.params.id);

    const goal = goals.find(g => g.id === id);

    goal.title = req.body.title;
    goal.targetDate = req.body.targetDate;
    goal.description = req.body.description;
    goal.featured = req.body.featured === "on";
    res.redirect("/goals");
});

// START SERVER
app.listen(3000, () => {
    console.log("StudyBuddy running at http://localhost:3000");
});