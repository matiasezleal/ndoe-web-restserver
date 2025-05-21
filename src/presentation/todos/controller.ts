import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository } from '../../domain';


export class TodosController {

    // DI
    constructor(
        private readonly todoRepository: TodoRepository,
    ){}

    public getTodos = async (req: Request, res: Response) => {
        const todosList = await this.todoRepository.getAll();
        return res.json(todosList);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: 'Id is not a number' });
        }
        
        try {
            const todo = await this.todoRepository.getById(parseInt(id));
            return res.json(todo);
        } catch (error) {
            return res.status(404).json({ error: error });
        }
    }

    public createTodo = async (req: Request, res: Response) =>{
        const [error,createTodoDto] = CreateTodoDto.create(req.body);

        if(error) return res.status(400).json({message:error});

        const newTodo = await this.todoRepository.create(createTodoDto!);

        return res.status(201).json(newTodo);
    }

    public updateTodo = async(req: Request, res: Response) => {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: 'Id is not a number' });
        }

        const [error, updateTodoDto] = UpdateTodoDto.create(req.body);
        if (error) return res.status(400).json({ message: error });
        
        try {
            const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);
            return res.json(updatedTodo);
        } catch (error) {
            return res.status(404).json({ error: error });
        }
    }

    public deleteTodo = async (req: Request, res: Response) =>{
        const { id } = req.params;
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: 'Id is not a number' });
        }
        
        try {
            await this.todoRepository.deleteById(parseInt(id));
            return res.status(204).json();
        } catch (error) {
            return res.status(404).json({ error: error });
        }
    }
}