import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";



export abstract class TodoRepository{
    abstract create(todo: CreateTodoDto): Promise<TodoEntity>;
    abstract getById(id: number): Promise<TodoEntity>;
    abstract updateById(todo: UpdateTodoDto): Promise<TodoEntity>;
    abstract deleteById(id: number): Promise<void>;
    abstract getAll(): Promise<TodoEntity[]>;
}