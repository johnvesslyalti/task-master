import { useState } from "react";
import api from "../../utils/api";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

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
      setMessage("✅ Registration successful! Please login.");
    } catch (error) {
      console.error(error);
      setMessage("❌ Registration failed. Please try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-amber-100 to-white">
        <button type="button" onClick={() => navigate(-1)} className="flex absolute top-6 left-6 items-center text-amber-600 hover:text-amber-800 transition duration-200 cursor-pointer">
            <GoArrowLeft className="text-xl mr-2" />
            <span>Back</span>
        </button>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-center text-amber-600 mb-2">Create an Account</h1>
        <p className="text-center text-gray-500 mb-6">Start managing your tasks better!</p>

        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Name"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-amber-500"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-amber-500"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-amber-500"
        />

        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 transition-all duration-300 p-3 rounded-xl text-white font-semibold shadow-md"
        >
          Register
        </button>

        {message && (
          <p className={`text-center mt-2 ${message.includes('successful') ? 'text-green-600' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
