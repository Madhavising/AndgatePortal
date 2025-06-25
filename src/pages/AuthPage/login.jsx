// import axios from 'axios';
// import { useState } from 'react';
// import { baseUrl } from '../../api';
// import { toast } from 'react-toastify';
// import styles from './Login.module.css';
// import { useDispatch } from 'react-redux';
// import { getUserDetails } from '../../utils/auth';
// import { setUser } from '../../store/slice/userSclice';

// const LoginScreen = () => {
//     const dispatch = useDispatch();
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!username || !password) {
//             alert('Username and password are required');
//             return;
//         }

//         const payload = { email: username, password };

//         try {
//             const { status, data } = await axios.post(`${baseUrl}/api/auth/login`, payload);

//             if (status !== 200 || !data.token) {
//                 throw new Error('Login failed. Please check your credentials.');
//             }

//             localStorage.setItem("token", data.token);

//             const user = await getUserDetails(data.token);
//             dispatch(setUser({ ...user, token: data.token }));

//             toast.success('Login successful!', {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//             });

//             setTimeout(() => window.location.reload(), 1000);

//         } catch (error) {
//             console.error('Login Error:', error.message);
//             alert(error.message || 'An unexpected error occurred.');
//         }
//     };


//     return (
//         <div className={styles.loginContainer}>
//             <div className={styles.imageSection}></div>
//             <div className={styles.formSection}>
//                 <form onSubmit={handleSubmit} className={styles.loginForm}>
//                     <h2 className={styles.title}>Login</h2>

//                     <div className={styles.inputGroup}>
//                         <label htmlFor="username" className={styles.label}>Username</label>
//                         <input
//                             type="text"
//                             id="username"
//                             value={username}
//                             onChange={e => setUsername(e.target.value)}
//                             className={styles.input}
//                             required
//                         />
//                     </div>

//                     <div className={styles.inputGroup}>
//                         <label htmlFor="password" className={styles.label}>Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={e => setPassword(e.target.value)}
//                             className={styles.input}
//                             required
//                         />
//                     </div>

//                     <button type="submit" className={styles.submitButton}>Login</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default LoginScreen;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { baseUrl } from '../../api';
import { getUserDetails } from '../../utils/auth';
import { setUser } from '../../store/slice/userSclice';

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`, payload);

      if (!response.status) throw new Error("Authentication failed.");

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);

        try {
          const user = await getUserDetails(response.data.token);
          dispatch(setUser({ ...user, token: response.data.token }));
          toast.success("Login successful!");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } catch (err) {
          toast.warning("Login succeeded, but fetching user details failed.");
        }
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden md:flex flex-1 flex-col justify-center bg-gradient-to-br from-red-950 via-red-900 to-red-800 text-white relative overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-tr from-red-500 to-yellow-500 opacity-20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.5, 1], rotate: [0, 360, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 text-start px-10">
          <h1 className="text-5xl font-extrabold mb-4">Welcome AndGate Portal</h1>
          <p className="text-lg font-medium">Sign in to continue</p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-6">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-center text-red-600">Welcome Back</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 border rounded-lg"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 border rounded-lg"
              />
              <span
                className="absolute right-3 top-4 cursor-pointer text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default LoginScreen;

