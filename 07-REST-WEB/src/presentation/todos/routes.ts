import { Router } from "express";
import { TodosController } from "./controller";

export class TodosRoutes {
    static get routes(): Router {
        const router = Router();
        const todoController = new TodosController();

        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);
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