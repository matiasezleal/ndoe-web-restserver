import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';


export class TodosController {

    // DI
    constructor() {
        // this.todosService = todosService;
    }

    public getTodos = async (req: Request, res: Response) => {
        const todoList = await prisma.todo.findMany();
        return res.json(todoList);
    }
    public getTodoById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: 'Id is not a number' });
        }
        

        const todo = await prisma.todo.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        return res.json(todo);
    }

    public createTodo = async (req: Request, res: Response) =>{
        const {title}= req.body;

        if(!title){
            return res.status(400).json({message:'Title is required'});
        }

        const newTodo = await prisma.todo.create({
            data: {
                title: title,
                completed: false,
                createdAt: new Date()
            }
        });
        return res.status(201).json(newTodo);
    }

    public updateTodo = async(req: Request, res: Response) => {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: 'Id is not a number' });
        }

        const { title, completed, createdAt } = req.body;
        
        const todo = await prisma.todo.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        const updatedTodo = await prisma.todo.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title: title || todo.title,
                completed: completed || todo.completed,
                createdAt: new Date(createdAt || todo.createdAt)
            }
        });

        return res.json(todo);
    }

    public deleteTodo = async (req: Request, res: Response) =>{
        const { id } = req.params;
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: 'Id is not a number' });
        }
        
        const todo = await prisma.todo.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        await prisma.todo.delete({
            where: {
                id: parseInt(id)
            }
        });

        return res.status(204).json();
    }
}