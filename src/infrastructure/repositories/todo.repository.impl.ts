import { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";


/*
    This is the implementation of the TodoRepository interface.
    It can seem redundant to have this implementation, but having it allows us to change the datasource implementation
    without affecting the repository interface.

    This is known as "Dependency Inversion Principle"

    and in the case we need to make some logic with another necesary data we can have consuming different datasources to avoid to have only one class with all the logic (both datasource in one class would be a violation of this principle and confusing)
*/

export class TodoRepositoryImpl extends TodoRepository{

    constructor(
        private readonly todoDatasource: TodoDataSource
    ){
        super();
    }

    create(todo: CreateTodoDto): Promise<TodoEntity> {
        return this.todoDatasource.create(todo);
    }
    getById(id: number): Promise<TodoEntity> {
        return this.todoDatasource.getById(id);
    }
    updateById(todo: UpdateTodoDto): Promise<TodoEntity> {
        return this.todoDatasource.updateById(todo);
    }
    deleteById(id: number): Promise<void> {
        return this.todoDatasource.deleteById(id);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.todoDatasource.getAll();
    }



    
    
    
}