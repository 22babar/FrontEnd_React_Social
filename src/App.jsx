import "./App.css";

import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, [ ]);

  let s = axios.create({
    baseURL: 'http://localhost:3000'
  })
  const fetchUsers = async () => {
    const res = await s.axios.get("/api/user");
    setUsers(res.data);
  };


   // 🗑️ Delete user
  const handleDelete = async (id) => {
  try {
    await s.axios.delete(`/api/user/${id}`);
    fetchUsers(); // refresh list
  } catch (err) {
    console.error("Delete failed:", err);
  }
};

  // useEffect(() => {
  //   axios.get("http://localhost:3000/api/users")
  //     .then(res => setUsers(res.data))
  //     .catch(err => console.error(err));
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await s.axios.post("/api/user", form);
    setForm({ name: "", email: "" });
    const res = await s.axios.get("/api/user");
    setUsers(res.data);
     fetchUsers(); // Refresh list
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Users</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">Add User</button>
      </form>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email})
            <button
              onClick={() => handleDelete(u.id)}
              style={{ marginLeft: 10, color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
