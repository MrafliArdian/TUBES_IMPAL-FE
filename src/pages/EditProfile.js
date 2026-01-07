import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar/NavBar';
import './EditProfile.css';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function EditProfile() {
    const { user, refreshUser } = useAuth();
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [noHandphone, setNoHandphone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Load current user data on mount
    useEffect(() => {
        if (user) {
            setNama(user.full_name || '');
            setEmail(user.email || '');
            setNoHandphone(user.phone_number || '');
        }
    }, [user]);

    const handleSave = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const payload = {
                full_name: nama,
                email: email,
                phone_number: noHandphone
            };

            await api.patch('auth/profile/', payload);
            setSuccess('Profil berhasil diperbarui!');
            
            // Refresh user data in context
            await refreshUser();
        } catch (err) {
            console.error(err);
            setError('Gagal memperbarui profil. ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavBar isLoggedIn={true} />

            <div className='edit-profile-container'>
                <div className='edit-profile-header'>
                    <h1>Edit Profile</h1>
                    <p>Perbarui informasi akun anda</p>
                </div>

                <div className='edit-profile-card'>
                    {error && <p className="error-msg" style={{color: 'red', textAlign: 'center'}}>{error}</p>}
                    {success && <p className="success-msg" style={{color: 'green', textAlign: 'center'}}>{success}</p>}

                    <div className='form-group'>
                        <label>Nama Lengkap</label>
                        <input
                            type="text"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            placeholder="Masukkan Nama Lengkap"
                            disabled={loading}
                        />
                    </div>

                    <div className='form-group'>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Masukkan Email"
                            disabled={loading}
                        />
                    </div>

                    <div className='form-group'>
                        <label>No. Handphone</label>
                        <input
                            type="text"
                            value={noHandphone}
                            onChange={(e) => setNoHandphone(e.target.value)}
                            placeholder="Masukkan No. Handphone"
                            disabled={loading}
                        />
                    </div>

                    <div className='button-container'>
                        <button className='btn-save' onClick={handleSave} disabled={loading}>
                            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default EditProfile;
