import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' }); // Added 'role'

  const fetchUsers = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    axios.get('http://localhost:5004/api/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => setUsers(response.data))
      .catch(error => {
        if (error.response && error.response.status === 401) {
          setError('Unauthorized. Please log in again.');
        } else {
          setError('Error fetching users: ' + error.message);
        }
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRemove = (userId) => {
    const token = localStorage.getItem('token');
    
    axios.delete(`http://localhost:5004/api/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        setUsers(users.filter(user => user._id !== userId));
      })
      .catch(error => {
        setError('Error removing user: ' + error.message);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios.post('http://localhost:5004/api/users/register', newUser, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({ name: '', email: '', role: 'user' }); // Reset form with default 'user' role
      })
      .catch(error => {
        setError('Error registering user: ' + error.message);
      });
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Admin Dashboard - Users</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      
       

      <h3>User List</h3>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th> {/* Added Role column */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td> {/* Display role */}
              <td><button onClick={() => handleRemove(user._id)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
