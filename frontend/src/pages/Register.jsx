import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', { name, email, password });
      setName('');
      setEmail('');
      setPassword('');
      setMessage("Registration successful! Please login.");
    } catch (error) {
      console.error(error);
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-gray-800 to-gray-700 text-gray-200">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex absolute top-6 left-6 items-center text-amber-400 hover:text-amber-500 transition duration-200 cursor-pointer"
      >
        <GoArrowLeft className="text-xl mr-2" />
        <span>Back</span>
      </button>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full max-w-md bg-gray-800 p-8 rounded-3xl shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center text-amber-300 mb-2">Create an Account</h1>
        <p className="text-center text-gray-400 mb-6">Start managing your tasks better!</p>

        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Name"
          className="bg-gray-700 border border-gray-600 p-3 rounded-lg focus:outline-none focus:border-amber-400 placeholder-gray-400 text-white"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
          className="bg-gray-700 border border-gray-600 p-3 rounded-lg focus:outline-none focus:border-amber-400 placeholder-gray-400 text-white"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          className="bg-gray-700 border border-gray-600 p-3 rounded-lg focus:outline-none focus:border-amber-400 placeholder-gray-400 text-white"
        />

        <button
          type="submit"
          className="bg-amber-400 hover:bg-amber-500 transition-all duration-300 p-3 rounded-xl text-gray-900 font-semibold shadow-md"
        >
          Register
        </button>

        {message && (
          <p className={`text-center mt-2 ${message.includes('successful') ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
