import React, { useState, useEffect } from "react";
import "./AdminPanel.css";
import NavBar from "../components/NavBar/NavBar";
import { Button } from "../components/Button/Button";
import api from '../services/api';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('auth/admin/users/');
      setUsers(response.data.users || []);
    } catch (err) {
      console.error(err);
      setError('Gagal mengambil data user. Pastikan anda login debagai Admin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      <div className="admin-wrapper">
        
        {/* ========== SIDEBAR ========== */}
        <div className="admin-sidebar">
          <h2>
            <span className="logo">KI</span> Admin Panel
          </h2>

          <ul>
            <li className="active">Dashboard</li>
            <li>
              <Button
              to='/upload-artikel' 
              className='btns-admin' 
              buttonStyle='btn--darkgreen' 
              buttonSize='btn--medium'
              >
                Upload Artikel
              </Button>
            </li>

            <li>
              <Button
              to='/dashboard' 
              className='btns-admin' 
              buttonStyle='btn--darkgreen' 
              buttonSize='btn--medium'
              >
                Back to Home
              </Button>
              </li>
          </ul>
        </div>

        {/* ========== MAIN CONTENT ========== */}
        <div className="admin-content">
          <h1>Dashboard</h1>
            
            {error && <p className="error-msg" style={{color: 'red'}}>{error}</p>}
            {loading ? (
                <p>Loading data...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Date Join</th>
                    <th>Role</th>
                    <th>Nama Lengkap</th>
                    <th>No. HP</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((u, index) => (
                    <tr key={index}>
                      <td>{u.username}</td>
                      <td>{u.email}</td>
                      <td>{u.date_joined ? new Date(u.date_joined).toLocaleDateString() : '-'}</td>
                      <td>{u.role}</td>
                      <td>{u.full_name}</td>
                      <td>{u.phone_number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>

      </div>
    </>
  );
}
