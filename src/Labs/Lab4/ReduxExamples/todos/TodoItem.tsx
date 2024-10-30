import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

interface Todo {
    id: string;
    title: string;
}

interface TodoItemProps {
    todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
    const dispatch = useDispatch();

    return (
        <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
            <b>{todo.title}</b>
            <div>
                <button className="btn btn-primary" onClick={() => dispatch(setTodo(todo))}
                    id="wd-set-todo-click">
                    Edit
                </button>
                {" "}
                <button className="btn btn-danger" onClick={() => dispatch(deleteTodo(todo.id))}
                    id="wd-delete-todo-click">
                    Delete
                </button>
            </div>
        </li>
    );
}
