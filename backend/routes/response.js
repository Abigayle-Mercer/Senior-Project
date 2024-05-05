import express from "express";
import {
  createResponse,
  getResponses,
  getResponse,
  deleteResponse,
  updateResponse,
} from "../controllers/responseController.js";
import { authenticateUser } from "../auth.js";
const router = express.Router();
router.use(authenticateUser);

// get all Responses
router.get("/", getResponses);

// GET a singl response
router.get("/:id", getResponse);
// POST a new response
router.post("/", createResponse);

// DELETE a response
router.delete("/:id", deleteResponse);

// UPDATE a response
router.patch("/:id", updateResponse);

export { router as responseRoutes }; // Export surveyRoutes

