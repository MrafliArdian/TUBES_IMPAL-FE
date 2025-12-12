import React, { useState } from "react";
import "./AdminPanel.css";
import NavBar from "../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import { Button } from "../components/Button/Button";

export default function AdminPanel() {
  const [users] = useState([
    { username: "novel", email: "novelshiffa@gmail.com", join: "2023-10-01", role: "Admin", nama: "Novel Shiffa Octaviani", hp: "081234567890" },
    { username: "nada", email: "nadanabilah@gmail.com", join: "2023-12-11", role: "User", nama: "Nada Nabilah", hp: "081223344556" },
    { username: "fathir", email: "fathirahmad@gmail.com", join: "2024-01-05", role: "User", nama: "Fathir Ahmad Lidzikri", hp: "082111554433" },
    { username: "aisyah", email: "aisyahrahma@gmail.com", join: "2023-09-20", role: "Admin", nama: "Aisyah Rahma Putri", hp: "081345667899" },
    { username: "rafli", email: "raflipr@gmail.com", join: "2023-08-14", role: "User", nama: "Rafli Pratama", hp: "089522334411" },
    { username: "farhan", email: "farhanrmdn@gmail.com", join: "2024-02-01", role: "User", nama: "Farhan Ramadhan", hp: "081876543210" }
  ]);

  return (
    <>

      <div className="admin-wrapper">
        
        {/* ========== SIDEBAR ========== */}
        <div className="admin-sidebar">
          <h2>
            <span className="logo">KI</span> Admin Panel
          </h2>

          <ul>
            <li className="active">Dashboard</li>
            <Button
            to='/upload-artikel' 
            className='btns' 
            buttonStyle='btn--darkgreen' 
            buttonSize='btn--medium'
            >
              Upload Artikel
            </Button>

            <Button
            to='/dashboard' 
            className='btns' 
            buttonStyle='btn--darkgreen' 
            buttonSize='btn--medium'
            >
              Back to Home
            </Button>
          </ul>
        </div>

        {/* ========== MAIN CONTENT ========== */}
        <div className="admin-content">
          <h1>Dashboard</h1>

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
                  <td>{u.join}</td>
                  <td>{u.role}</td>
                  <td>{u.nama}</td>
                  <td>{u.hp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}
