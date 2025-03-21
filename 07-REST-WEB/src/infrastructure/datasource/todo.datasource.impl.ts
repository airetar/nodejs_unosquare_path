import { prisma } from "../../data/postgres-client";
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";

export class TodoDatasourceImpl implements TodoDataSource {
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto
        });

        return TodoEntity.fromObject(todo);
    }
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(TodoEntity.fromObject);
    }
    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({where: { id }});
        if (!todo) throw `Todo with id ${id} not found`;

        return TodoEntity.fromObject(todo);
    }
    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        const id = updateTodoDto.id;
        const todo = await prisma.todo.findFirst({where: {id}});
        if(!todo) throw `Todo with id ${id} not found`;

        const updateTodo = await prisma.todo.update({
            where: { id },
            data: updateTodoDto.values
        });
        return TodoEntity.fromObject(updateTodo);
    }
    async deleteById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({where: {id}});
        if(!todo) throw `Todo with id ${id} not found`;
        const deletedTodo = await prisma.todo.delete({where: {id}});
        return TodoEntity.fromObject(deletedTodo);
    }
    
}