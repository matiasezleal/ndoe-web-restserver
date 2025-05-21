
import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface CreateTodoUseCase {
    execute(todo: CreateTodoDto): Promise<TodoEntity>;
}


export class CreateTodoUseCaseImpl implements CreateTodoUseCase {
    constructor(private readonly todoRepository: TodoRepository) {}

    async execute(todo: CreateTodoDto): Promise<TodoEntity> {
        return this.todoRepository.create(todo);
    }
}