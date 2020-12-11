const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");

const dbUrl =
  "mongodb+srv://userAssignment:userAssignment@assignmentdb.pbkyo.mongodb.net/assignmentdb?retryWrites=true&w=majority";

try {
  mongoose.connect(
    dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("MongoDB Atlas connected by mongoose");
    }
  );
} catch (e) {
  console.log("could not connect");
}

// mongoose.connection.once('open',()=>{
//   console.log("MongoDB connection establish successfully");
// });

const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log("error", err);
    } else {
      console.log(todos);

      res.json(todos);
    }
  });
});

app.post("/create", (req, res) => {
  const todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      console.log("data", JSON.stringify(todo));
      res.json(todo);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;

  Todo.findById(id, (err, todo) => {
    res.json(todo);
  });
});

app.post("/:id", (req, res) => {
  const id = req.params.id;

  Todo.findById(id, (err, todo) => {
    if (!todo) {
      res.status(404).send("Todo not found");
    } else {
      todo.text = req.body.text;

      todo
        .save()
        .then((todo) => {
          res.json(todo);
        })
        .catch((err) => res.status(500).send(err.message));
    }
  });
});

app.delete("delete/:id", (req, res) => {
  const id = req.params.id;
  console.log('delid',id);
  Todo.remove({_id:ObjectID(id)}).then(()=>{
    res.status(200);
  });
});

app.listen(PORT, () => {
  console.log("Server Started at port : ", PORT);
});
