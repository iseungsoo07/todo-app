import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { retrieveHelloWorldPathVariable } from "./api/HelloWorldApiService";
import { useAuth } from "./security/AuthContext";

export default function WelcomeComponent() {
    const { username } = useParams();

    const [message, setMessage] = useState(null);
    const { token } = useAuth();

    function callHelloWorldRestApi() {
        console.log("called");

        retrieveHelloWorldPathVariable(username, token)
            .then((response) => successfulResponse(response))
            .catch((err) => errorResponse(err))
            .finally(() => console.log("cleanup"));
    }

    function successfulResponse(response) {
        console.log(response);
        //   setMessage(response.data);
        setMessage(response.data.message);
    }

    function errorResponse(error) {
        console.log(error);
    }

    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
            <div>
                Manage your todos. - <Link to="/todos">Go here</Link>
            </div>
            <div>
                <button
                    className="btn btn-success m-5"
                    onClick={callHelloWorldRestApi}
                >
                    Call Hello Wrold
                </button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    );
}
