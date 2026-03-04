import express from 'express';
import workoutsController from '../controllers/workoutsController.js';
import { workoutValidationRules } from '../validation/workoutValidation.js';

const router = express.Router();

router.get('/', workoutsController.getAll);
router.get('/:id', workoutsController.getSingle);

router.post('/', workoutValidationRules, workoutsController.createWorkout);
router.put('/:id', workoutValidationRules, workoutsController.updateWorkout);

router.delete('/:id', workoutsController.deleteWorkout);

export default router;