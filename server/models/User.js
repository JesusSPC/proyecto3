const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    firstLogin: Boolean,
    googleID: String,
    facebookID: String,
    validationCode: String,
    tasksId: [{ type: Schema.Types.ObjectId, ref: "Task" }]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
