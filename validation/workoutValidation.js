import { body } from 'express-validator';

export const workoutValidationRules = [
  body('name')
    .exists({ checkNull: true }).withMessage('Name is required')
    .bail()
    .trim()
    .notEmpty().withMessage('Name cannot be empty')
    .isString().withMessage('Name must be a string'),

  body('type')
    .exists({ checkNull: true }).withMessage('Type is required')
    .bail()
    .trim()
    .notEmpty().withMessage('Type cannot be empty')
    .isString().withMessage('Type must be a string'),

  body('duration')
    .exists({ checkNull: true }).withMessage('Duration is required')
    .bail()
    .notEmpty().withMessage('Duration cannot be empty')
    .isInt({ min: 1 }).withMessage('Duration must be a positive integer'),

  body('date')
    .exists({ checkNull: true }).withMessage('Date is required')
    .bail()
    .notEmpty().withMessage('Date cannot be empty')
    .isISO8601().withMessage('Date must be a valid ISO date'),

  body('calories')
    .optional()
    .isInt({ min: 0 }).withMessage('Calories must be a non-negative integer')
];