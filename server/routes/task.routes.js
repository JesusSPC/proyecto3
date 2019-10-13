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
    .then(taskDeleted => {
      User.findByIdAndUpdate(req.user._id, { $pull: {tasksId: req.params.id}}, {new: true})
        .populate("tasksId")
        .then(userUpdated => {
          console.log(userUpdated)
          res
            .status(200)
            .json({
              Task: "task deleted successfully",
              tasks: userUpdated.tasksId
            });
        });
    })
    .catch(err => {
      res.status(400).send("Failed deleting task!");
    });
});

router.post("/addTask", (req, res, next) => {
  const { name, bio, time, frequency } = req.body;

  Task.create({
    name,
    bio,
    time,
    timeLapsed: 0,
    frequency,
    creatorId: req.user
  })
    .then(task => {
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: {
            tasksId: 
            { 
              $each: [task._id],
              $position: 0
            }
          }
        },
        {
          new: true
        }
      )
        .populate("tasksId")
        .then(userUpdated => {
          res
            .status(200)
            .json({
              Task: "task added successfully",
              tasks: userUpdated.tasksId
            });
        });
    })
    .catch(err => {
      res.status(400).send("Failed adding new task!");
    });
});

router.post("/:id/editTask", (req, res, next) => {
  const id = req.params.id;
  const { name, bio, time, frequency } = req.body;

  Task.findByIdAndUpdate(id, { name, bio, time, frequency }, { new: true })
    .then(editedTask => {
      res.status(200).json({ Task: "task edited successfully" });
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/:id/updateTime", (req, res, next) => {
  const id = req.params.id;
  const { minutes, seconds, millis } = req.body;
  console.log( req.body )
  console.log(id)

  Task.findByIdAndUpdate(id, { minutes, seconds, millis }, {new: true})
  .then(updatedTime => {
    console.log(updatedTime, "HOLAAAAAAAAAAAa")
    res.status(200).json({ Task: "task timer updated successfully" });
  })
  .catch(error => {
    console.log("ERROOOOOOOOOOOR")
    console.log(error);
  });
});

module.exports = router;