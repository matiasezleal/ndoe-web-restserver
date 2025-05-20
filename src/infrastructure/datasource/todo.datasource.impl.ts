import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";



export class TodoDataSourceImpl extends TodoDataSource{
    async create(todo: CreateTodoDto): Promise<TodoEntity> {
        const newTodo = await prisma.todo.create({
            data: todo!
        });

        return TodoEntity.fromObject(newTodo);
    }
    async getById(id: number): Promise<TodoEntity> {

        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        });
        if (!todo)throw `Todo with ${id} not found`;

        return TodoEntity.fromObject(todo);
           
        
    }


    async updateById(todo: UpdateTodoDto): Promise<TodoEntity> {

        const foundTodo = await this.getById(todo.id);

        const updatedTodo = await prisma.todo.update({
            where: {
                id: todo.id
            },
            data: todo.values
        });

        return TodoEntity.fromObject(updatedTodo);
    }

    async deleteById(id: number): Promise<void> {
        const todoToDelete = await this.getById(id);

        const deletedTodo = await prisma.todo.delete({
            where: {
                id: id
            }
        });

        if(!deletedTodo) throw `Todo with id ${id} not deleted`;
    }

    async getAll(): Promise<TodoEntity[]> {
        const todoList = await prisma.todo.findMany();
        return todoList.map((todo) => TodoEntity.fromObject(todo));
    }

}