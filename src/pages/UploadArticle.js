import React, { useState } from "react";
import "./UploadArticle.css";

export default function UploadArticle() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    image_url: "",
    source_link: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
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

    console.log("Data dikirim:", form);
    alert("Artikel berhasil diunggah!");
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
          <li>Back to Home</li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="admin-content">
        <h1>Upload Artikel</h1>

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

          <button className="btn-save" onClick={handleSubmit}>
            Simpan Artikel
          </button>

        </div>
      </div>
    </div>
  );
}
