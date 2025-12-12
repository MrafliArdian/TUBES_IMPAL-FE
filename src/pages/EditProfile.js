import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import './EditProfile.css';

function EditProfile() {
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [noHandphone, setNoHandphone] = useState('');

    const handleSave = () => {
        alert("Profil berhasil diperbarui!");
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

                    <div className='form-group'>
                        <label>Nama Lengkap</label>
                        <input
                            type="text"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            placeholder="Masukkan Nama Lengkap"
                        />
                    </div>

                    <div className='form-group'>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Masukkan Email"
                        />
                    </div>

                    <div className='form-group'>
                        <label>No. Handphone</label>
                        <input
                            type="text"
                            value={noHandphone}
                            onChange={(e) => setNoHandphone(e.target.value)}
                            placeholder="Masukkan No. Handphone"
                        />
                    </div>

                    <div className='button-container'>
                        <button className='btn-save' onClick={handleSave}>
                            Simpan Perubahan
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default EditProfile;
