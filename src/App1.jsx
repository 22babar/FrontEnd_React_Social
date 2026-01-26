import './App.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

function App1() {
  const [user, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers('http://localhost:3000/api/users');
  }, []);

  const fetchUsers = async (url) => {
    const res = await axios.get(url);
    setUsers(res.data);
    console.log(res.data);
  };

  // 🗑️ Delete user

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);

      // refresh list
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  //-------------------------------------------

  // 🗑️ Delete user
  /** Delete with SweetAlert2 confirmation */

  // const handleDelete = async (id) => {
  // const result = await MySwal.fire({
  //   icon: 'warning',
  //   title: 'Are you sure?',
  //   text: `Delete "${id}"? This cannot be undone`,
  //   showCancelButton: true,
  //   confirmButtonColor: '#d33',
  //   cancelButtonColor: '#3085d6',
  //   confirmButtonText: 'Yes, delete it!',
  //   cancelButtonText: 'Cancel',
  // });

  // If user clicked "Yes"
  // if (result.isConfirmed) {
  // try {
  // await axios.delete(`http://localhost:3000/api/user/${id}`);
  // MySwal.fire('Deleted!', 'User has been deleted.', 'success');
  // fetchUsers();
  // refresh list
  // } catch (err) {
  // console.error('Delete failed:', err);

  // MySwal.fire('Error!', 'Failed to delete user.', 'error');
  // }
  // };

  // useEffect(() => {
  //   axios.get('http://localhost:3000/api/users')
  //     .then((res) => setUsers(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <>
      <div>
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
                {
                  <td>
                    {
                      <button id='del' onClick={() => handleDelete(u.id)}>
                        Delete
                      </button>
                    }
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App1;
