import dotenv from "dotenv";

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === "development";

export const PORT = process.env.PORT || 5000;
export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || `localhost`;
export const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0.4ukno.mongodb.net/${process.env.MONGO_DEFAULT_DB}?retryWrites=true&w=majority&appName=Cluster0`;
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
