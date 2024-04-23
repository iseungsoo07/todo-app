import { useEffect, useState } from "react";
import {
    deleteTodoApi,
    retrieveAllTodosForUsername,
} from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ListTodosComponent() {
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);

    const { username } = useAuth();

    const navigate = useNavigate();

    function refreshTodos() {
        retrieveAllTodosForUsername(username)
            .then((res) => setTodos(res.data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        refreshTodos();
    }, []);

    function deleteTodo(id) {
        deleteTodoApi(username, id)
            .then(() => {
                setMessage(`Delete of todo with id = ${id} successful`);
                refreshTodos();
            })
            .catch();
    }

    function updateTodo(id) {
        navigate(`/todo/${id}`);
    }

    function addNewTodo() {
        navigate(`/todo/-1`);
    }

    return (
        <div className="container">
            <h1>Things You Want to Do!</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>description</th>
                            <th>Target Date</th>
                            <th>Is Done?</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo) => {
                            return (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.targetDate}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => updateTodo(todo.id)}
                                        >
                                            UPDATE
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => deleteTodo(todo.id)}
                                        >
                                            DELETE
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}>
                Add New Todo
            </div>
        </div>
    );
}
