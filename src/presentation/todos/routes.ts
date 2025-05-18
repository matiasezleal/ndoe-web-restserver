import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {
    private routes: string[] = [];


    static get routes():Router{
        const router = Router();

        const todoController = new TodosController();
        router.get('/', todoController.getTodos);
        router.post('/', todoController.createTodo);
        router.get('/:id', todoController.getTodoById);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);
    
        return router;
    }    

}