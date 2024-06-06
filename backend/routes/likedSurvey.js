import express from "express";
import {
  createLikedSurvey,
  getLikedSurvey,
  getLikedSurveys,
  deleteLikedSurvey,
  updateLikedSurvey,
} from "../controllers/likedSurveyController.js";
import { authenticateUser } from "../auth.js";
const router = express.Router();

router.use(authenticateUser);
// get all surveys
router.get("/", getLikedSurveys);

// GET a singl survey
router.get("/:id", getLikedSurvey);
// POST a new survey
router.post("/", createLikedSurvey);

// DELETE a survey
router.delete("/:id", deleteLikedSurvey);

// UPDATE a survey
router.patch("/:id", updateLikedSurvey);

export { router as likedSurveyRoutes }; // Export surveyRoutes
