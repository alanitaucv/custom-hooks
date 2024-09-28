import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

export const useTodo = () => {

    const initialState = [];

    const init = () => {
        return JSON.parse(localStorage.getItem('todos')) || []
    }

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])
    
    const handlerNewTodo = ( todo ) => {
        const action = {
            type: 'Add Todo',
            payload: todo
        }
        dispatch (action);
    }

    const handlerDeleteTodo = ( id ) => {
        const action = {
            type: 'Remove Todo',
            payload: id
        }
        dispatch(action);
    }

    const handlerToggleTodo = ( id ) => {
        const action = {
            type: 'Toggle Todo',
            payload: id
        }
        dispatch(action);
    }

    return {
        todos,
        handlerNewTodo,
        handlerDeleteTodo,
        handlerToggleTodo,
        todosCount: todos.length, 
        pendingTodosCount: todos.filter( todo => !todo.done).length
    }
}
