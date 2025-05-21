
import {UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface UpdateTodoUseCase {
    execute(todo: UpdateTodoDto): Promise<TodoEntity>;
}


export class UpdateTodoUseCaseImpl implements UpdateTodoUseCase {
    constructor(private readonly todoRepository: TodoRepository) {}

    async execute(todo: UpdateTodoDto): Promise<TodoEntity> {
        return this.todoRepository.updateById(todo);
    }
}