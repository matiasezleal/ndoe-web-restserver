import { Request, Response } from 'express';

const todos = [
    { id: 1, title: 'Todo 1', createdAt: new Date(), completed: false },
    { id: 2, title: 'Todo 2', createdAt: new Date(), completed: true },
    { id: 3, title: 'Todo 3', createdAt: new Date(), completed: false }
];


export class TodosController {

    // DI
    constructor() {
        // this.todosService = todosService;
    }

    public getTodos = (req: Request, res: Response) => {
        return res.json(todos);
    }
    public getTodoById = (req: Request, res: Response) => {
        const { id } = req.params;
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: 'Id is not a number' });
        }
        const todo = todos.find(todo => todo.id === parseInt(id));
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        return res.json(todo);
    }

    public createTodo = (req: Request, res: Response) =>{
        const {text}= req.body;

        if(!text){
            return res.status(400).json({message:'Text is required'});
        }
        const newTodo = {
            id: todos.length + 1,
            title: text,
            createdAt: new Date(),
            completed: false
        };
        todos.push(newTodo);
        return res.status(201).json(newTodo);
    }

    public updateTodo = (req: Request, res: Response) => {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: 'Id is not a number' });
        }

        const { text, completed, createdAt } = req.body;
 
        const todo = todos.find(todo => todo.id === parseInt(id));
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        todo.title = text || todo.title;
        todo.completed = completed || todo.completed;
        todo.createdAt = new Date(createdAt || todo.createdAt);

        return res.json(todo);
    }

    public deleteTodo = (req: Request, res: Response) =>{
        const { id } = req.params;
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: 'Id is not a number' });
        }
        const todo = todos.find(todo => todo.id === parseInt(id));
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todos.splice(todos.indexOf(todo), 1);
        return res.status(204).json();
    }
}