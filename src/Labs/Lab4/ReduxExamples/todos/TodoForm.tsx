
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();

    return (
        <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="col-auto">
                <input className="form-control"
                    onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
                    style={{ fontWeight: 'bold' }}
                    value={todo.title} />
            </div>
            <div>
                <button className="btn btn-warning" onClick={() => dispatch(updateTodo(todo))}
                    id="wd-update-todo-click">
                    Update
                </button>
                {" "}
                <button className="btn btn-success" onClick={() => dispatch(addTodo(todo))}
                    id="wd-add-todo-click">
                    Add
                </button>
            </div>
        </li>
    );
}
