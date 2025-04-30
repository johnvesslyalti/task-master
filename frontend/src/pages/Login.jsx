import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { GoArrowLeft } from "react-icons/go";
import api from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // <-- new

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
      setSuccess(true); // Show success popup
      setTimeout(() => {
        navigate(`/${user.name}/dashboard`);
      }, 2000); // Navigate after 2 seconds
    } catch (error) {
      console.error(error);
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-amber-100 to-white relative">
        <button type="button" onClick={() => navigate(-1)} className="flex absolute top-6 left-6 items-center text-amber-600 hover:text-amber-800 transition duration-200 cursor-pointer">
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
        className="flex flex-col gap-5 w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-center text-amber-600 mb-2">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-6">Login to your account</p>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-amber-500"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-amber-500"
        />

        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 transition-all duration-300 p-3 rounded-xl text-white font-semibold shadow-md flex items-center justify-center cursor-pointer"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </form>
    </div>
  );
}
