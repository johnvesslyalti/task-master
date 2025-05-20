import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { GoArrowLeft } from "react-icons/go";
import api from "../utils/api";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      login(token, user.name);
      setSuccess(true);
      setTimeout(() => {
        navigate(`/${user.name}/dashboard`);
      }, 2000);
    } catch (error) {
      console.error(error);
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-gray-800 to-gray-700 relative text-gray-200">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex absolute top-6 left-6 items-center text-amber-400 hover:text-amber-500 transition duration-200 cursor-pointer"
      >
        <GoArrowLeft className="text-xl mr-2" />
        <span>Back</span>
      </button>

      {success && (
        <div className="absolute top-10 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg text-lg animate-bounce">
          Login Successful!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full max-w-md bg-gray-800 p-8 rounded-3xl shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center text-amber-300 mb-2">Welcome Back</h1>
        <p className="text-center text-gray-400 mb-6">Login to your account</p>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="bg-gray-700 border border-gray-600 p-3 rounded-lg focus:outline-none focus:border-amber-400 placeholder-gray-400 text-white"
        />
        <div className="relative">
          <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="bg-gray-700 w-full border border-gray-600 p-3 rounded-lg focus:outline-none focus:border-amber-400 placeholder-gray-400 text-white"
          />
          <button
            type="button"
            onClick={handleShowPassword}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl text-gray-400 hover:text-white"
            >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        <button
          type="submit"
          className="bg-amber-400 hover:bg-amber-500 transition-all duration-300 p-3 rounded-xl text-gray-900 font-semibold shadow-md flex items-center justify-center cursor-pointer"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="text-red-400 text-center mt-2">{error}</p>}
      </form>
    </div>
  );
}
