export default function ListTodosComponent() {
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDay()
  );

  const todos = [
    {
      id: 1,
      description: "Learn AWS",
      done: false,
      targetDate: targetDate,
    },
    {
      id: 2,
      description: "Learn Full Stack Dev",
      done: false,
      targetDate: targetDate,
    },
    {
      id: 3,
      description: "Learn DevOps",
      done: false,
      targetDate: targetDate,
    },
  ];

  return (
    <div className="container">
      <h1>Things You Want to Do!</h1>
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>id</td>
              <td>description</td>
              <td>Target Date</td>
              <td>Is Done?</td>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.description}</td>
                  <td>{todo.targetDate.toDateString()}</td>
                  <td>{todo.done.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
