import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';


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
        const [error,createTodoDto] = CreateTodoDto.create(req.body);

        if(error) return res.status(400).json({message:error});

        const newTodo = await prisma.todo.create({
            data: createTodoDto!
        });

        return res.status(201).json(newTodo);
    }

    public updateTodo = async(req: Request, res: Response) => {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: 'Id is not a number' });
        }

        const [error, updateTodoDto] = UpdateTodoDto.create(req.body);
        if (error) return res.status(400).json({ message: error });
        
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
            data: updateTodoDto!.values
        });

        return res.json(updatedTodo);
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