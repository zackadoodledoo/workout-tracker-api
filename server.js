import express from 'express';
import mongodb from './data/database.js';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import workoutRoutes from './routes/workouts.js';
import { readFile } from 'fs/promises';
import session from 'express-session';
import passport from './auth/passport.js';
import authRoutes from './auth/authRoutes.js';

dotenv.config();

const swaggerDocument = JSON.parse(
  await readFile(new URL('./swagger.json', import.meta.url))
);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Authentication routes
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

// Routes
// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Workout Tracker API is running' });
});

// API Routes
app.use('/api/workouts', workoutRoutes);

// DataBase + Server Start Up
mongodb.initDb(async (err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    try {
      await mongodb.getDb().db().admin().ping();
      console.log("Database connection verified!");
      app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (pingErr) {
      console.error("Database is NOT reachable:", pingErr.message);
    }
  }
});

