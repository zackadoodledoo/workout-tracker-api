import express from 'express';
import workoutsController from '../controllers/workoutsController.js';
import { workoutValidationRules } from '../validation/workoutValidation.js';

const router = express.Router();

/**
 * @swagger
 * /api/workouts:
 *   get:
 *     summary: Get all workouts
 */
router.get('/', workoutsController.getAll);

/**
 * @swagger
 * /api/workouts/{id}:
 *   get:
 *     summary: Get a workout by ID
 */
router.get('/:id', workoutsController.getSingle);

/**
 * @swagger
 * /api/workouts:
 *   post:
 *     summary: Create a new workout
 */
router.post('/', workoutValidationRules, workoutsController.createWorkout);

/**
 * @swagger
 * /api/workouts/{id}:
 *   put:
 *     summary: Update a workout
 */
router.put('/:id', workoutValidationRules, workoutsController.updateWorkout);

/**
 * @swagger
 * /api/workouts/{id}:
 *   delete:
 *     summary: Delete a workout
 */
router.delete('/:id', workoutsController.deleteWorkout);

export default router;