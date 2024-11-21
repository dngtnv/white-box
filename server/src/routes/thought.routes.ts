import express, { Request, Response, NextFunction } from "express";
import { postThoughts, getThoughts } from "../controllers/thought.controllers";
import { moderateContent } from "../middlewares/moderateContent";

const router = express.Router();

const validateThoughtContent = (req: Request, res: Response, next: NextFunction) => {
  const { content } = req.body;

  if (!content || typeof content !== "string" || content.trim().length === 0) {
    return res.status(400).json({ error: "Content cannot be empty." });
  }
  if (content.length > 280) {
    return res.status(400).json({ error: "Content exceeds 280 characters." });
  }
  next();
};

router.get("/thoughts", getThoughts);

router.post("/thoughts", validateThoughtContent, moderateContent, postThoughts);

export default router;
