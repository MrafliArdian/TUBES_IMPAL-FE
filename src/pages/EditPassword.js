import React, { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import "./EditPassword.css";
import api from '../services/api';

function EditPassword() {
  const [data, setData] = useState({
    old_password: "",
    new_password: "",
    new_password2: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!data.old_password || !data.new_password || !data.new_password2) {
      setError("Semua field wajib diisi!");
      return;
    }

    if (data.new_password !== data.new_password2) {
      setError("Password baru dan konfirmasi tidak cocok!");
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.post('auth/change-password/', data);
      setSuccess('Password berhasil diperbarui! Silakan login ulang dengan password baru.');
      
      // Clear form
      setData({
        old_password: "",
        new_password: "",
        new_password2: "",
      });
    } catch (err) {
      console.error(err);
      setError('Gagal mengubah password. ' + (err.response?.data?.old_password?.[0] || err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
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
          {error && <p className="error-msg" style={{color: 'red', textAlign: 'center'}}>{error}</p>}
          {success && <p className="success-msg" style={{color: 'green', textAlign: 'center'}}>{success}</p>}

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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <button className="btn-submit" onClick={handleSave} disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>
    </>
  );
}

export default EditPassword;
