
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetAllTodosUseCase {
    execute(): Promise<TodoEntity[]>;
}

export class GetAllTodoUseCaseImpl implements GetAllTodosUseCase {
    constructor(private readonly todoRepository: TodoRepository) {}

    async execute(): Promise<TodoEntity[]> {
        return this.todoRepository.getAll();
    }
}