
import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface DeleteTodoUseCase {
    execute(id: number): Promise<void>;
}


export class DeleteTodoUseCaseImpl implements DeleteTodoUseCase {
    constructor(private readonly todoRepository: TodoRepository) {}

    async execute(id: number): Promise<void> {
        return this.todoRepository.deleteById(id);
    }
}