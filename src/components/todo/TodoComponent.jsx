import { useNavigate, useParams } from "react-router-dom";
import {
    createTodoApi,
    retrieveTodoApi,
    updateTodoApi,
} from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import moment from "moment";

export default function TodoComponent() {
    const { id } = useParams();
    const { username } = useAuth();
    const naviagte = useNavigate();

    const [description, setDescription] = useState("");
    const [targetDate, setTargetDate] = useState("");

    useEffect(() => retrieveTodos(), [id]);

    function retrieveTodos() {
        if (id != -1) {
            retrieveTodoApi(username, id)
                .then((res) => {
                    setDescription(res.data.description);
                    setTargetDate(res.data.targetDate);
                })
                .catch((err) => console.log(err));
        }
    }

    function onSubmit(values) {
        console.log(values);
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false,
        };

        if (id == -1) {
            createTodoApi(username, todo)
                .then((res) => {
                    naviagte("/todos");
                })
                .catch((err) => console.log(err));
        } else {
            updateTodoApi(username, id, todo)
                .then((res) => {
                    naviagte("/todos");
                })
                .catch((err) => console.log(err));
        }
    }

    function validate(values) {
        let errors = {
            // description: "Enter a valid description",
            // targetDate: "Enter a valid target date",
        };

        if (values.description.length < 5) {
            errors.description = "Enter at least 5 chracters";
        }

        if (
            values.targetDate === null ||
            values.targetDate === "" ||
            !moment(values.targetDate).isValid()
        ) {
            errors.targetDate = "Enter a target date";
        }

        console.log(values);
        return errors;
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik
                    initialValues={{ description, targetDate }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {(props) => (
                        <Form>
                            <ErrorMessage
                                name="description"
                                component="div"
                                className="alert alert-warning"
                            />
                            <ErrorMessage
                                name="targetDate"
                                component="div"
                                className="alert alert-warning"
                            />
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="description"
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Tartget Date</label>
                                <Field
                                    type="date"
                                    className="form-control"
                                    name="targetDate"
                                />
                            </fieldset>
                            <div>
                                <button
                                    className="btn btn-success m-5"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
