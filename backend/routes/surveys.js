import express from "express";
import {createSurvey, getSurvey, getSurveys, deleteSurvey, updateSurvey} from "../controllers/surveyController.js";
import { authenticateUser } from "../auth.js";
const router = express.Router();

router.use(authenticateUser);
// get all surveys
router.get('/', getSurveys)

// GET a singl survey
router.get('/:id', getSurvey)
// POST a new survey
router.post('/', createSurvey)

// DELETE a survey
router.delete('/:id', deleteSurvey)

// UPDATE a survey
router.patch('/:id', updateSurvey)


export { router as surveyRoutes }; // Export surveyRoutes
