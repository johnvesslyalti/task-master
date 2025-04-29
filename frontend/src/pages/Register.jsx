import { useState } from "react";
import api from "../../utils/api";

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', {
                name,
                email,
                password
            });
            setName('');
            setEmail('');
            setPassword('');
            setMessage("Registration successful! Please login.");
        } catch (error) {
            console.error(error);
            alert('login failed');
        }
    };

    return(
        <div className="h-screen flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96 p-5 border border-gray-300 rounded-lg shadow-md">
                <h1 className="text-2xl text-center">Register</h1>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" className="border border-gray-300 p-2 rounded-md" />
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" className="border border-gray-300 p-2 rounded-md" />
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" className="border border-gray-300 p-2 rounded-md" />
                <button type="submit" className="bg-amber-500 p-3 cursor-pointer text-white rounded-xl">Register</button>
                {message && <p className="text-center">{message}</p>}
            </form>
        </div>
    )
}