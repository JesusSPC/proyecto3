require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Task = require("../models/Task");
const bcryptSalt = 10;
const { DBURL } = process.env;
console.log(DBURL);
mongoose
  .connect(`${DBURL}`, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });


const tasks = [
  {
    name: "Bailar flamenco",
    bio: "Para el concurso de baile.",
    time: 12,
    timeLapsed: 0,
    frequency: "Week",
    active: false,
    finished: false,
    creatorId: "5d9df978e0cb31235f26ac30"
  },
  {
    name: "Jugar a la play",
    bio: "Witcher 3, The Last of Us 2, God of War pendientes.",
    time: 240,
    timeLapsed: 167,
    frequency: "Week",
    active: false,
    finished: false,
    creatorId: "5d9df978e0cb31235f26ac30"
  },
  {
    name: "Montar en bici",
    bio: "Que me lo ha mandado el médico que estoy muy gordo.",
    time: 1,
    timeLapsed: 0,
    frequency: "Day",
    active: false,
    finished: false,
    creatorId: "5d9df978e0cb31235f26ac30"
  },
  {
    name: "Estudiar canvas",
    bio: "Quiero hacer bismutos por programación.",
    time: 220,
    timeLapsed: 64,
    frequency: "Month",
    active: false,
    finished: false,
    creatorId: "5d9df978e0cb31235f26ac30"
  }
];


  Task.deleteMany()
  .then(() => {
    return Task.create(tasks).then(tasksCreated => {
      console.log(
        `${tasksCreated.length} users created with the following id:`
      );
      console.log(tasksCreated.map(u => u._id));
    });
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });

  
