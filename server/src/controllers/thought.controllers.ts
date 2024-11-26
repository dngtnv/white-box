import { Request, Response, NextFunction } from "express";
import Thought from "../models/thought.models";

export const postThoughts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, styles } = req.body;
    const newThought = new Thought({ content, styles });
    await newThought.save();
    res.status(201).json({ message: "Created thought" });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getThoughts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const thoughts = await Thought.find().sort({ createdAt: -1 }).limit(20);
    res.status(200).json(thoughts);
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
