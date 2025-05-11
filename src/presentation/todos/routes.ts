import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {
    private routes: string[] = [];
    
    

    static get routes():Router{
        const router = Router();

        const todoController = new TodosController();
        router.get('/', todoController.getTodos);
        return router;
    }    
    getRouteById(id: number){
        return this.routes[id];
    }
}