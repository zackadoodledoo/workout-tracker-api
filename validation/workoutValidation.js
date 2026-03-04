import { check } from 'express-validator';

export const workoutValidationRules = [
  check('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),

  check('type')
    .trim()
    .notEmpty().withMessage('Type is required')
    .isString().withMessage('Type must be a string'),

  check('duration')
    .notEmpty().withMessage('Duration is required')
    .isNumeric().withMessage('Duration must be a number'),

  check('calories')
    .notEmpty().withMessage('Calories is required')
    .isNumeric().withMessage('Calories must be a number')
];