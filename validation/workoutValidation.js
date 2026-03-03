import { check } from 'express-validator';

export const workoutValidationRules = [
  check('name').trim().notEmpty().withMessage('Name is required'),
  check('type').trim().notEmpty().withMessage('Type is required'),
  check('duration').isNumeric().withMessage('Duration must be a number'),
  check('calories').isNumeric().withMessage('Calories must be a number')
];