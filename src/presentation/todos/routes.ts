import { Router } from "express";
import { TodosController } from "./controller";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl";
import { TodoDataSourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";

export class TodoRoutes {
    private routes: string[] = [];


    static get routes():Router{
        const router = Router();
        const dataSource = new TodoDataSourceImpl();
        const todoRepository = new TodoRepositoryImpl(dataSource);
        const todoController = new TodosController(todoRepository);
        router.get('/', todoController.getTodos);
        router.post('/', todoController.createTodo);
        router.get('/:id', todoController.getTodoById);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);
    
        return router;
    }    

}