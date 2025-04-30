import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";


export default function AddTask() {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const { username } = useParams(); // Assuming you have the username in context
    const [sucess, setSuccess] = useState(false);

    const addTask = async (e) => {
        e.preventDefault();

        if(!title) {
            alert('Please enter a title for the task');
            return;
        }

        try {
            await api.post('/tasks', {
                title,
                description,
                status
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            )
            setSuccess(true);
            setTimeout(() => {
                navigate(`/${username}/dashboard`);
            }, 2000); // Navigate after 2 seconds
        } catch (error) {
            console.error(error);
            alert('Error adding task. Please try again.');
        }
    }
    return(
        <div className="min-h-screen bg-gradient-to-br from-amber-100 to-white p-6 flex justify-center items-center">
            {sucess && (
                <div className="absolute top-10 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg text-lg animate-bounce">
                    Task Added Successfully!
                </div>
            )}
            <button type="button" onClick={() => navigate(-1)} className="flex absolute top-6 left-6 items-center text-amber-600 hover:text-amber-800 transition duration-200 cursor-pointer">
                    <GoArrowLeft className="text-xl mr-2" />
                    <span>Back to dashboard</span>
                </button>
            <form onSubmit={addTask} className="flex flex-col gap-5 w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl">
                
                <h1 className="text-3xl font-bold text-center text-amber-600 mb-2">Add a New Task</h1>
                <p className="text-center text-gray-500 mb-6">Fill in the details below:</p>

                <input
                    type="text"
                    placeholder="Task Title"
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-amber-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Task Description"
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-amber-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-amber-500">
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>

                <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 transition-all duration-300 p-3 rounded-xl text-white font-semibold shadow-md cursor-pointer"
                >
                    Add Task
                </button>

            </form>
        </div>
    )
}