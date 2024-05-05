import  express from "express";
import {
  createReflectionResponse,
  getReflectionResponses,
  getReflectionResponse,
  deleteReflectionResponse,
  updateReflectionResponse,
} from "../controllers/reflectionResponseController.js";
import { authenticateUser } from "../auth.js";
const router = express.Router();
router.use(authenticateUser);

// get all Reflections
router.get("/", getReflectionResponses);

// GET a singl Reflection
router.get("/:id", getReflectionResponse);
// POST a new Reflection
router.post("/", createReflectionResponse);

// DELETE a Reflection
router.delete("/:id", deleteReflectionResponse);

// UPDATE a Reflection
router.patch("/:id", updateReflectionResponse);

export { router as reflectionResponseRoutes }; // Export surveyRoutes

