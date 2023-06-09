const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/myWorkouts", ensureAuth, postsController.getMyWorkouts);
router.post("/deleteSavedWorkout", ensureAuth, postsController.deleteSavedWorkout);
router.delete("/deleteWorkoutLog", ensureAuth, postsController.deleteWorkoutLog);


router.get("/workouts", ensureAuth, postsController.getWorkouts);
router.post("/searchWorkout", ensureAuth, postsController.searchWorkout);
router.post('/savedWorkout', ensureAuth, postsController.saveWorkout);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
