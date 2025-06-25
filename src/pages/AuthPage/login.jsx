import axios from 'axios';
import { useState } from 'react';
import { baseUrl } from '../../api';
import { toast } from 'react-toastify';
import styles from './Login.module.css';
import { useDispatch } from 'react-redux';
import { getUserDetails } from '../../utils/auth';
import { setUser } from '../../store/slice/userSclice';

const LoginScreen = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert('Username and password are required');
            return;
        }

        const payload = { email: username, password };

        try {
            const { status, data } = await axios.post(`${baseUrl}/api/auth/login`, payload);

            if (status !== 200 || !data.token) {
                throw new Error('Login failed. Please check your credentials.');
            }

            localStorage.setItem("token", data.token);

            const user = await getUserDetails(data.token);
            dispatch(setUser({ ...user, token: data.token }));

            toast.success('Login successful!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
            });

            setTimeout(() => window.location.reload(), 1000);

        } catch (error) {
            console.error('Login Error:', error.message);
            alert(error.message || 'An unexpected error occurred.');
        }
    };


    return (
        <div className={styles.loginContainer}>
            <div className={styles.imageSection}></div>
            <div className={styles.formSection}>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <h2 className={styles.title}>Login</h2>

                    <div className={styles.inputGroup}>
                        <label htmlFor="username" className={styles.label}>Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitButton}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;
