import React, { useState } from "react";
import "./UploadArticle.css";
import api from '../services/api';
import { Button } from "../components/Button/Button";

export default function UploadArticle() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    image_url: "",
    source_link: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.description ||
      !form.content ||
      !form.image_url ||
      !form.source_link
    ) {
      alert("Semua field wajib diisi!");
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
        await api.post('artikel/', form);
        setSuccess('Artikel berhasil diunggah!');
        setForm({
            title: "",
            description: "",
            content: "",
            image_url: "",
            source_link: "",
        });
    } catch (err) {
        console.error(err);
        setError('Gagal mengunggah artikel. ' + (err.response?.data?.message || err.message));
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="admin-wrapper">

      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <h2>
          <span className="logo">KI</span> Admin Panel
        </h2>

        <ul>
          <li>Dashboard</li>
          <li className="active">Upload Artikel</li>
           <Button
            to='/admin-panel' 
            className='btns' 
            buttonStyle='btn--darkgreen' 
            buttonSize='btn--medium'
            >
              Back to Dashboard
            </Button>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="admin-content">
        <h1>Upload Artikel</h1>

        {error && <p className="error-msg" style={{color: 'red'}}>{error}</p>}
        {success && <p className="success-msg" style={{color: 'green'}}>{success}</p>}

        <div className="upload-article-card">

          {/* Judul */}
          <div className="form-group">
            <label>Judul Artikel</label>
            <input
              type="text"
              name="title"
              placeholder="Masukkan judul artikel"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          {/* Deskripsi */}
          <div className="form-group">
            <label>Deskripsi Singkat</label>
            <input
              type="text"
              name="description"
              placeholder="Masukkan deskripsi singkat"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Isi */}
          <div className="form-group">
            <label>Isi Artikel</label>
            <textarea
              name="content"
              rows="6"
              placeholder="Tulis isi artikel..."
              value={form.content}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Image URL */}
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              name="image_url"
              placeholder="Masukkan URL gambar"
              value={form.image_url}
              onChange={handleChange}
            />
          </div>

          {/* Source Link */}
          <div className="form-group">
            <label>Source Link</label>
            <input
              type="text"
              name="source_link"
              placeholder="Masukkan link sumber"
              value={form.source_link}
              onChange={handleChange}
            />
          </div>

          <button className="btn-save" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan Artikel'}
          </button>

        </div>
      </div>
    </div>
  );
}
