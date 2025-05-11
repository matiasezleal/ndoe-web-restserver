import { Request, Response } from 'express';
export class TodosController {

    // DI
    constructor() {
        // this.todosService = todosService;
    }

    public getTodos = (req: Request, res: Response) => {
        res.json([
            { id: 1, title: 'Todo 1', createdAt: new Date(), completed: false },
            { id: 2, title: 'Todo 2', createdAt: new Date(), completed: true },
            { id: 3, title: 'Todo 3', createdAt: new Date(), completed: false }
        ]);
    }
}