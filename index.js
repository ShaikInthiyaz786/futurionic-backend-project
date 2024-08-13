import express from "express";
import { connection } from "./config/database.js"; 

const app = express();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connection();
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
};

startServer();
