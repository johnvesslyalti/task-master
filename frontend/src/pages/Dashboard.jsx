import { useContext, useEffect, useState } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const { token } = useContext(AuthContext);

    const fetchTasks = async () => {
        try {
            const response = await api.get("/tasks", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    return(
        <div className="h-screen">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <ul className="mt-4 grid grid-cols-3">
                {tasks.map(task => (
                    <li key={task._id} className="py-2">{task.title}</li>
                ))}
            </ul>
        </div>
    )
}