import "./App.css";
import Swal from 'sweetalert2';

import { useState, useEffect } from "react";
import axios from "axios";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
      text: "Your imaginary file is safe :)",
      icon: "error"
    });
  }
});

function App() {
  const [user, setUsers] = useState([]);
  const [form, setForm] = useState({ id:"", FirstName: "", LastName: "" , City: "", Country: "", Email: "", PhoneNo: "", Password: "", UserName: "" ,CreatedAt: ""});

  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/api/user");
    setUsers(res.data);
  };


   // 🗑️ Delete user
  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/user/${id}`);
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
    await axios.post("http://localhost:3000/api/user", form);
    setForm({ name: "", email: "" });
    const res = await axios.get("http://localhost:3000/api/user");
    setUsers(res.data);
     fetchUsers(); // Refresh list
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Users</h1>

        <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Country</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Password</th>
            <th>User Name</th>
            <th>Created At</th>
            <th>Delete Button</th>
          </tr>
        </thead>
        <tbody>
          {user.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.FirstName}</td>
              <td>{u.LastName}</td>
              <td>{u.City}</td>
              <td>{u.Country}</td>
              <td>{u.Email}</td>
              <td>{u.PhoneNo}</td>
              <td>{u.Password}</td>
              <td>{u.UserName}</td>
              <td>{u.Created_At}</td>
              <td>{<button id="del" onClick={() => handleDelete(u.id)}            >
              Delete
            </button>
         }</td>
            </tr>
          ))}
        </tbody>
        </table>
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

     
    </div>
  );
}

export default App;
