import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(false);
        setError('');

        if(!email || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }  
        
        try {
            const response = await api.post('/auth/login', {
                email,
                password
            });
            const { token, user } = response.data;

            login(token, user.name);
            navigate(`/${user.name}/dashboard`);
        } catch (error) {
            console.error(error);
            setError('Login failed. Please check your credentials.')
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="h-screen flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96 p-5 border border-gray-300 rounded-lg shadow-md">
                <h1 className="text-2xl text-center">Login</h1>
                <input value={email} onChange={(e) => setEmail(e.target.value)}  type="text" placeholder="Email" className="border border-gray-300 p-2 rounded-md" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="border border-gray-300 p-2 rounded-md" />
                <button type="submit" className="bg-amber-500 p-3 cursor-pointer text-white rounded-xl">Login</button>
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
        </div>
    )
}