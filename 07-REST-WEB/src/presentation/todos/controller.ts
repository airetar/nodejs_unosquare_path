import { Request, Response } from "express";

interface Todo {
    id: number;
    text: string;
    createdAt?: Date | null;
}

const todos: Todo[] = [
    { id: 1, text: 'Buy milk', createdAt: new Date() },
    { id: 2, text: 'Buy bread', createdAt: new Date() },
    { id: 3, text: 'Buy butter', createdAt: new Date() },
];

export class TodosController {

    // * DI
    constructor() {}

    public getTodos = (req: Request, res: Response) => {
        res.json(todos);
        return;
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) res.status(400).json({ error: `TODO must be a number`})
        const todo = todos.find(todo => todo.id === id);
        
        ( todo )
            ? res.json(todo)
            : res.status(404).json({ error: `TODO with id ${ id } not found` });
    }

    public createTodo = (req: Request, res: Response) =>  {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: 'Text property is required' });
        const newTodo = {
            id: todos.length + 1,
            text: text,
            createdAt: new Date()
        };
        todos.push(newTodo);
        res.json(newTodo);
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: `TODO must be a number`});
        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({ error: `TODO with id ${ id } not found` });
        const { text, createdAt } = req.body;
        if (!text) return res.status(400).json({ error: 'Text property is required' });

        todo.text = text || todo.text;
        ( createdAt === 'null' )
            ? todo.createdAt = null
            : todo.createdAt = new Date( createdAt || todo.createdAt );
        
        res.json(todo);
    }

    public deleteTodo = ( req: Request, res: Response ) => {
        const id = +req.params.id;
        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({ error: `TODO with id ${ id } not found` });
        todos.splice(todos.indexOf(todo), 1);
        return res.json(todo);
    }
}