
import React, { useEffect, useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    dueDate: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editingTodo, setEditingTodo] = useState({});

  const fetchTodos = () => {
    let url = '/api/todos';
    if (filter !== 'ALL') {
      url = `/api/todos/filter?completed=${filter === 'COMPLETED'}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(setTodos);
  };

  useEffect(() => {
    fetchTodos();
  }, [filter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo(prev => ({ ...prev, [name]: value }));
  };

  const addTodo = () => {
    if (!newTodo.title || !newTodo.description) return;
    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newTodo, completed: false })
    })
      .then(() => {
        setNewTodo({ title: '', description: '', dueDate: '' });
        fetchTodos();
      });
  };

  const deleteTodo = (id) => {
    fetch(`/api/todos/${id}`, { method: 'DELETE' })
      .then(fetchTodos);
  };

  const toggleComplete = (todo) => {
    fetch(`/api/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...todo, completed: !todo.completed })
    }).then(fetchTodos);
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingTodo({ ...todo });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTodo({});
  };

  const saveEdit = () => {
    fetch(`/api/todos/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingTodo)
    }).then(() => {
      setEditingId(null);
      fetchTodos();
    });
  };

  return (
    <div>
      <h2>My ToDos</h2>
      <div>
        <input name="title" value={newTodo.title} onChange={handleInputChange} placeholder="Title" />
        <input name="description" value={newTodo.description} onChange={handleInputChange} placeholder="Description" />
        <input name="dueDate" type="date" value={newTodo.dueDate} onChange={handleInputChange} />
        <button onClick={addTodo}>Add</button>
      </div>

      <div style={{ marginTop: '10px' }}>
        Filter:
        <button onClick={() => setFilter('ALL')}>All</button>
        <button onClick={() => setFilter('COMPLETED')}>Completed</button>
        <button onClick={() => setFilter('PENDING')}>Pending</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo)} />
            {editingId === todo.id ? (
              <>
                <input
                  value={editingTodo.title}
                  onChange={e => setEditingTodo(prev => ({ ...prev, title: e.target.value }))}
                />
                <input
                  value={editingTodo.description}
                  onChange={e => setEditingTodo(prev => ({ ...prev, description: e.target.value }))}
                />
                <input
                  type="date"
                  value={editingTodo.dueDate || ''}
                  onChange={e => setEditingTodo(prev => ({ ...prev, dueDate: e.target.value }))}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  <strong>{todo.title}</strong>: {todo.description}
                  {todo.dueDate && <> | Due: {todo.dueDate}</>}
                </span>
                <button onClick={() => startEdit(todo)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
