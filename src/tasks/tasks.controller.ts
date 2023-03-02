import { Task } from './tasks.entity';
import { AppDataSource } from '../../index';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';

class TasksController {
    public async getAll(
        req: Request,
        res: Response,
    ): Promise<Response> {
        //Declare a variable to hold all tasks
        let allTasks: Task[];

        //Fetch all tasks using the repository
        try {
            allTasks = await AppDataSource.getRepository(
                Task,
            ).find({
                order: {
                    date: 'ASC',
                },
            });
            //Convert the tasks instance to an array of objects
            allTasks = instanceToPlain(allTasks) as Task[];

            return res.json(allTasks).status(200);
        } catch (_errors) {
            return res
                .json({ erros: 'Internal Server Error' })
                .status(500);
        }
    }
}

export const tasksController = new TasksController();
