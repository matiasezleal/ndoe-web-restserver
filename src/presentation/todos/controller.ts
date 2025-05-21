import { Request, Response } from 'express';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository
    ,CreateTodoUseCaseImpl, DeleteTodoUseCaseImpl,
     GetAllTodoUseCaseImpl, GetTodoUseCaseImpl, 
     UpdateTodoUseCaseImpl  } from '../../domain';

export class TodosController {

    // DI
    constructor(
        private readonly todoRepository: TodoRepository,
    ){}

    public getTodos = async (req: Request, res: Response) => {
        new GetAllTodoUseCaseImpl(this.todoRepository)
        .execute()
        .then(todos => res.json(todos))
        .catch(error => res.status(400).json({error}));
        
    }

    public getTodoById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: 'Id is not a number' });
        }
        
        new GetTodoUseCaseImpl(this.todoRepository)
        .execute(parseInt(id))
        .then(todo => res.json(todo))
        .catch(error => res.status(400).json({error}));
    }

    public createTodo = async (req: Request, res: Response) =>{
        const [error,createTodoDto] = CreateTodoDto.create(req.body);

        if(error) return res.status(400).json({message:error});

        new CreateTodoUseCaseImpl(this.todoRepository)
        .execute(createTodoDto!)
        .then(todo => res.status(201).json(todo))
        .catch(error => res.status(400).json({error}));
    }

    public updateTodo = async(req: Request, res: Response) => {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: 'Id is not a number' });
        }

        const [error, updateTodoDto] = UpdateTodoDto.create(req.body);
        if (error) return res.status(400).json({ message: error });
        
        new UpdateTodoUseCaseImpl(this.todoRepository)
        .execute(updateTodoDto!)
        .then(todo => res.json(todo))
        .catch(error => res.status(400).json({error}));
    }

    public deleteTodo = async (req: Request, res: Response) =>{
        const { id } = req.params;
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: 'Id is not a number' });
        }
        
        new DeleteTodoUseCaseImpl(this.todoRepository)
        .execute(parseInt(id))
        .then(() => res.status(204).json())
        .catch(error => res.status(400).json({error}));
    }
}