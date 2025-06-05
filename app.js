const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let tasks = [];

app.get("/", (req, res) => {
  res.render("index", { tasks: tasks });
});

app.post("/add", (req, res) => {
  const newItem = req.body.newItem.trim();
  if (newItem === "") {
    return res.send("<script>alert('Task cannot be empty!'); window.location.href='/';</script>");
  }
  tasks.push({ name: newItem, priority: "Medium" });
  res.redirect("/");
});

app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const updatedName = prompt("Enter new task name:");
  if (updatedName) {
    tasks[id].name = updatedName;
  }
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  tasks.splice(id, 1);
  res.redirect("/");
});

app.get("/filter", (req, res) => {
  const priority = req.query.priority;
  const filteredTasks = priority
    ? tasks.filter(task => task.priority === priority)
    : tasks;
  res.render("list", { tasks: filteredTasks });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
