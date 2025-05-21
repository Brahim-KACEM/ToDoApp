
import React, { useEffect, useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  return (
    <ul>
      {todos.map((todo, idx) => (
        <li key={idx}>{todo.title || "Dummy Task"}</li>
      ))}
    </ul>
  );
}

export default TodoList;
