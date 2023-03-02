import { body, ValidationChain } from 'express-validator';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

export const createValidator: ValidationChain[] = [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Must add task title')
        .trim()
        .isString()
        .withMessage('Title needs to be text'),
    body('date')
        .not()
        .isEmpty()
        .withMessage('Must add a date')
        .isString()
        .withMessage('Needs to be a valid date format'),
    body('description')
        .trim()
        .isString()
        .withMessage('Needs to be in text'),
    body('priority')
        .trim()
        .isIn([
            Priority.normal,
            Priority.high,
            Priority.low,
        ])
        .withMessage(
            'Priority can be only normal, high or low',
        ),
    body('status')
        .trim()
        .isIn([
            Status.todo,
            Status.inProgress,
            Status.completed,
        ])
        .withMessage(
            'Status can be only todo, in progress or completed',
        ),
];

export const updateValidator = [
    body('id')
        .not()
        .isEmpty()
        .withMessage('Task ID is mandatory')
        .trim()
        .isString()
        .withMessage('ID needs to be a valid uuid format'),
    body('status')
        .trim()
        .isIn([
            Status.todo,
            Status.inProgress,
            Status.completed,
        ])
        .withMessage(
            'Status can be only todo, in progress or completed',
        ),
];
