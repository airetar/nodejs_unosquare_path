import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl";

export class TodosRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new TodoDatasourceImpl(); // puede cambiar el datasource por otro
        const todoRepository = new TodoRepositoryImpl(datasource);
        const todoController = new TodosController(todoRepository);
        router.get('/', (req, res) => {
            todoController.getTodos(req, res);
        });
        router.get('/:id', (req, res) => {
            todoController.getTodoById(req, res);
        });
        router.post('/', (req, res) => {
            todoController.createTodo(req, res);
        });
        router.put('/:id', (req, res) => {
            todoController.updateTodo(req, res)
        });
        router.delete('/:id', (req, res) => {
            todoController.deleteTodo(req, res);
        });

        return router;
    }
}