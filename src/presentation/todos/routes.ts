import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {
    private routes: string[] = [];
    
    

    static get routes():Router{
        const router = Router();

        const todoController = new TodosController();
        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);
    
        return router;
    }    

}