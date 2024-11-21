import { google } from "googleapis";
import { Request, Response, NextFunction } from "express";
import { GOOGLE_API_KEY } from "../config/config";
import logging from "../config/logging";

const DISCOVERY_URL = "https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1";

export const moderateContent = async (req: Request, res: Response, next: NextFunction) => {
  const { content } = req.body;
  const client = await google.discoverAPI(DISCOVERY_URL);
  client.comments
    // @ts-expect-error 3rd package
    .analyze({
      key: GOOGLE_API_KEY,
      resource: {
        comment: { text: content },
        requestedAttributes: { TOXICITY: {} }
      }
    })
    .then((response: any) => {
      const toxicity = response.data.attributeScores.TOXICITY.summaryScore.value;
      if (toxicity > 0.7) {
        logging.error("Content is inappropriate.");
        res.status(400).json({ message: "Content is inappropriate." });
      } else {
        next();
      }
    })
    .catch((err: Error) => {
      logging.error(err);
      res.status(500).json({ message: "Error moderating content" });
    });
};
