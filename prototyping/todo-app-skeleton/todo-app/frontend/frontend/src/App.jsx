
import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  if (!user) {
    return showSignup ? (
      <Signup onSignup={setUser} />
    ) : (
      <div>
        <Login onLogin={setUser} />
        <p>Don't have an account? <button onClick={() => setShowSignup(true)}>Sign up</button></p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Welcome, {user.email}</h1>
      <button onClick={() => { localStorage.clear(); setUser(null); }}>Logout</button>
      <TodoList user={user} />
    </div>
  );
}

export default App;
