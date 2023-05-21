const mongoose = require("mongoose");

const SavedWorkoutSchema = new mongoose.Schema({
    muscle: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      difficulty: {
        type: String,
        required: true
      },
      instructions: {
        type: String,
        required: true
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
});

module.exports = mongoose.model("SavedWorkout", SavedWorkoutSchema);



