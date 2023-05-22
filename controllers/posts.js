const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Workout = require("../models/Workout");
const SavedWorkout = require('../models/SavedWorkout');


module.exports = {
  getProfile: async (req, res) => {
    try {
      try {
        const posts = await Post.find({ user: req.user.id });
        res.render("profile.ejs", { posts: posts, user: req.user });
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const workouts = await Workout.find({ user: req.user.id });
      console.log(workouts)
      res.render("feed.ejs", { workouts: workouts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getWorkouts: async (req, res) => {
    try {
      const workouts = await Workout.find({ user: req.user.id });
      res.render("workouts.ejs", { workouts: workouts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  searchWorkout: async (req, res) => {
    try {
      const workoutValue = req.body.workOutValue;

      const { default: fetch } = await import('node-fetch');
  
      const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${workoutValue}`, {
        method: 'GET',
        headers: {
          'X-Api-Key': 'z+kP/dQ1FLHyJ/EwaC6oBg==0NTw6jxccdMQUNgj',
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
   
  
      // Pass the 'data' variable when rendering the 'workouts.ejs' template
      res.render('result.ejs', { data: data });
    } catch (err) {
      console.log(`error ${err}`);
      res.redirect('/errorPage');
    }
},







  
saveWorkout: async (req, res) => {
  try {
    console.log(req.body)
    
    // Access the relevant properties from the request body and save the workout to the database
    const { muscle, name, difficulty, instructions } = req.body
    console.log(req.body, muscle, name, difficulty, instructions)
    // Create a new instance of the SavedWorkout model with the extracted data
    const workout = new SavedWorkout({
      muscle: muscle,
      name: name,
      difficulty: difficulty,
      instructions: instructions,
    });

    // Save the workout to the database
    await workout.save();
console.log("workout Saved!!!")
    // Redirect to a success page or display a success message
    res.redirect("/workouts");
  } catch (err) {
    console.log(`Error saving workout: ${err}`);
    res.redirect("/errorPage");
  }
},

  

  
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  createWorkout: async (req, res) => {
    try {


      await Workout.create({
        workOutName: req.body.workOutName,
        bodyPart: req.body.bodyPart,
        weight: req.body.weight,
        reps: req.body.reps,
        sets: req.body.sets,
        user: req.user.id
      });
      console.log("Workout has been Added!");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },
  
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        madeBy: req.user.id,
        postID: req.params.id
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`); 
    } catch (err) {
      console.log(err);
    }
  },

  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },

 
};


