const mongoose = require("mongoose");

const SavedWorkoutSchema = new mongoose.Schema({
    muscle: {
        type: String,
     
      },
      name: {
        type: String,
     
      },
      difficulty: {
        type: String,
       
      },
      instructions: {
        type: String,
        
      },
      email:{
        type:String,
        ref: "User",
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



