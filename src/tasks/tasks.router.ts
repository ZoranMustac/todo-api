import { Request, Response, Router } from 'express';
import { TaskController } from './tasks.controller';
import { createValidator } from './tasks.validator';
import { validationResult } from 'express-validator/src/validation-result';

//Fire the router function
export const tasksRouter: Router = Router();

//Create a default route
tasksRouter.get(
    '/tasks',
    async (req: Request, res: Response) => {
        const taskController = new TaskController();
        const allTasks = await taskController.getAll();
        res.json(allTasks).status(200);
    },
);

tasksRouter.post(
    '/tasks',
    createValidator,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ errors: errors.array() });
        }
    },
);
