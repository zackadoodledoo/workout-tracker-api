import express from 'express';
import workoutsController from '../controllers/workoutsController.js';

const router = express.Router();

// 1. GET ALL Workouts (Points to the logic in your Controller)
router.get('/', workoutsController.getAll);

// 2. GET SINGLE Workout by ID
router.get('/:id', workoutsController.getSingle);

// 3. CREATE a New Workout
router.post('/', workoutsController.createWorkout);

// 4. UPDATE a Workout
router.put('/:id', workoutsController.updateWorkout);

// 5. DELETE a Workout
router.delete('/:id', workoutsController.deleteWorkout); 

export default router;
