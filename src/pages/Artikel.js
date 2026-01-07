import React, { useState, useEffect } from "react";
import "./Artikel.css";
import NavBar from "../components/NavBar/NavBar";
import api from '../services/api';

export default function Artikel() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('artikel/');
        setArticles(response.data || []);
      } catch (err) {
        console.error(err);
        setError('Gagal memuat artikel.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <NavBar isLoggedIn={true} />

      <div className="article-page">
        <h2>Artikel</h2>
        <p className="subtitle">
          Artikel berkualitas seputar investasi dan finance
        </p>

        {loading && <p style={{textAlign: 'center'}}>Memuat artikel...</p>}
        {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}

        <div className="article-list">
          {!loading && articles.length === 0 && (
            <p style={{textAlign: 'center'}}>Belum ada artikel yang tersedia.</p>
          )}
          
          {articles.map((a, index) => (
              <a
                key={a.id || index}
                href={a.source_link}
                target="_blank"
                rel="noopener noreferrer"
                className="article-card"
                >
                <div className="article-image">
                    <img src={a.image_url} alt={a.title} />
                </div>

                <div className="article-content">
                    <h3>{a.title}</h3>
                    <p>{a.description}</p>
                </div>
                </a>
          ))}
        </div>
      </div>
    </>
  );
}
