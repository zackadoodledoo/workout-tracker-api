import express from 'express';
import mongodb from './data/database.js'; // Ensure .js extension
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import workoutRoutes from './routes/workouts.js'; // Import routes here

// How to import JSON in ESM
import { readFile } from 'fs/promises';
const swaggerDocument = JSON.parse(
  await readFile(new URL('./swagger.json', import.meta.url))
);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/workouts', workoutRoutes);

mongodb.initDb(async (err) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
    } else {
        try {
            // "Ping" the database to confirm it's actually reachable
            await mongodb.getDb().db().admin().ping();
            console.log("Database connection verified!");
            app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        } catch (pingErr) {
            console.error("Database is NOT reachable:", pingErr.message);
        }
    }
});