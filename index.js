import express from "express";
import userRoutes from "./module/routes/userRoutes.js";
import { connection } from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Parse JSON request bodies
app.use('/users', userRoutes);

const startServer = async () => {
    try {
        await connection(); // Establish database connection
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

startServer();
