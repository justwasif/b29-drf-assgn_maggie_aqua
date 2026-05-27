import React, { useState } from 'react';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'designer', // Matches default in your Django model
    });
    const [status, setStatus] = useState({ loading: false, error: null, success: false });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: null, success: false });

        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ loading: false, error: null, success: true });
                // Optional: Redirect to login or clear form here
            } else {
                // Extracts error messages from DRF response
                const errorMsg = data.email ? data.email[0] : (data.detail || 'Registration failed');
                setStatus({ loading: false, error: errorMsg, success: false });
            }
        } catch (error) {
            setStatus({ loading: false, error: 'Network error occurred', success: false });
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            
            {status.error && <p style={{ color: 'red' }}>{status.error}</p>}
            {status.success && <p style={{ color: 'green' }}>Registration successful! You can now log in.</p>}
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username: </label>
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Email: </label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Role: </label>
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="admin">Admin</option>
                        <option value="project_lead">Project Lead</option>
                        <option value="designer">Designer</option>
                        <option value="writer">Writer</option>
                        <option value="reviewer">Reviewer</option>
                        <option value="client">Client</option>
                    </select>
                </div>
                <button type="submit" disabled={status.loading}>
                    {status.loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default Signup;