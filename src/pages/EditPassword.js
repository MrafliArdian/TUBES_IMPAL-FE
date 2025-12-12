import React, { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import "./EditPassword.css";

function EditPassword() {
  const [data, setData] = useState({
    old_password: "",
    new_password: "",
    new_password2: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (!data.old_password || !data.new_password || !data.new_password2) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (data.new_password !== data.new_password2) {
      alert("Password baru dan konfirmasi tidak cocok!");
      return;
    }

    alert("Password berhasil diperbarui!");
  };

  return (
    <>
      <NavBar isLoggedIn={true} />

      <div className="edit-profile-container">
        <div className="edit-profile-header">
          <h1>Edit Password</h1>
          <p>Perbarui keamanan akun Anda</p>
        </div>

        <div className="edit-profile-card">

          <div className="form-group">
            <label>Password Lama</label>
            <input
              type="password"
              name="old_password"
              className="input-field"
              value={data.old_password}
              onChange={handleChange}
              placeholder="Masukkan password lama"
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label>Password Baru</label>
            <input
              type="password"
              name="new_password"
              className="input-field"
              value={data.new_password}
              onChange={handleChange}
              placeholder="Masukkan password baru"
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label>Konfirmasi Password Baru</label>
            <input
              type="password"
              name="new_password2"
              className="input-field"
              value={data.new_password2}
              onChange={handleChange}
              placeholder="Ulangi password baru"
              autoComplete="new-password"
            />
          </div>

          <button className="btn-submit" onClick={handleSave}>
            Simpan Perubahan
          </button>
        </div>
      </div>
    </>
  );
}

export default EditPassword;
