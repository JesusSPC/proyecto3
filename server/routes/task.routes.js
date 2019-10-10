const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Task = require("../models/Task");

router.get("/all", (req, res, next) => {
  User.findById(req.user._id)
    .populate("tasksId")
    .then(foundUser => {
      res.json({ foundUser });
    })
    .catch(err => console.log(err));
});

router.delete("/:id", (req, res, next) => {
  Task.findByIdAndDelete(req.params.id)
    .then(task => {
      res.status(200).json({'Task': 'task deleted!'});
    })
    .catch(err => console.log(err));
});

router.post("/addTask", (req, res, next) => {
  const { name, bio, time, frequency } = req.body

  Task.create({
    name,
    bio,
    time,
    timeLapsed: 0,
    frequency,
    creatorId: req.user
  })
    .then(task => {
      User.findByIdAndUpdate(req.user._id, {
        $push: {
          tasksId: task._id
        }
      }, {
        new: true
      })
      .populate("tasksId")
      .then(userUpdated => {
        res.status(200).json({'Task': 'task added successfully', tasks: userUpdated.tasksId});
      })
  })
  .catch(err => {
      res.status(400).send('Failed adding new task!');
  });
});

router.post("/:id/editTask", (req, res, next) => {
  const id = req.params;
  const {name, bio, time, frequency } = req.body   
 
  Task.findByIdAndUpdate(id, {name, bio, time, frequency }, { new: true })
    .then(editedTask => {
      res.status(200).json({'Task': 'task edited successfully'});
    })
    .catch(error => {
      console.log(error);
    });
    // .catch(error => {
    //   res.status(400).send('Failed editing task!');
    // });
});

module.exports = router;
