import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState("");
  const [tasks, setTasks] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const API = "http://127.0.0.1:5000";

  // LOGIN
  const handleLogin = () => {
    fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => setToken(data.token))
      .catch(() => alert("Login failed"));
  };

  // FETCH TASKS
  const fetchTasks = () => {
    fetch(`${API}/api/tasks/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks));
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  // CREATE TASK
  const handleCreateTask = () => {
    if (!title) return alert("Title required");

    fetch(`${API}/api/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, location }),
    }).then(() => {
      setTitle("");
      setDescription("");
      setLocation("");
      fetchTasks();
    });
  };

  // DELETE TASK
  const handleDelete = (id) => {
    fetch(`${API}/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(fetchTasks);
  };

  // TOGGLE COMPLETE
  const handleToggle = (task) => {
    fetch(`${API}/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed: !task.completed }),
    }).then(fetchTasks);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📍 Task Manager</h1>

      {/* LOGIN FORM (ENTER KEY FIXED) */}
      {!token && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          style={styles.card}
        >
          <h2>Login</h2>

          <input
            style={styles.input}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button} type="submit">
            Login
          </button>
        </form>
      )}

      {/* TASK SECTION */}
      {token && (
        <>
          <button
            style={styles.logout}
            onClick={() => {
              setToken("");
              setTasks([]);
            }}
          >
            Logout
          </button>

          {/* CREATE TASK */}
          <div style={styles.card}>
            <h2>Create Task</h2>

            <input
              style={styles.input}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              style={styles.input}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              style={styles.input}
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <button style={styles.button} onClick={handleCreateTask}>
              Add Task
            </button>
          </div>

          {/* TASK LIST */}
          <div style={styles.taskList}>
            {tasks.map((task) => (
              <div key={task.id} style={styles.taskCard}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p><strong>{task.location}</strong></p>
                <p>
                  {task.completed ? "✅ Completed" : "❌ Not Completed"}
                </p>

                <div>
                  <button
                    style={styles.smallBtn}
                    onClick={() => handleToggle(task)}
                  >
                    Toggle
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// STYLES
const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    fontFamily: "Arial",
  },
  title: {
    textAlign: "center",
  },
  card: {
    background: "#f5f5f5",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
  logout: {
    marginBottom: "10px",
    background: "#333",
    color: "white",
    padding: "8px",
    border: "none",
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  taskCard: {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "6px",
  },
  smallBtn: {
    marginRight: "10px",
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px",
  },
};

export default App;