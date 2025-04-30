import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const { token, logout } = useContext(AuthContext);
  const { username } = useParams();
  const [ filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
        await api.delete(`/tasks/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
        console.error(error);
    }
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  const filteredTasks = tasks
  .filter((task) => {
    if( filterStatus === "all") return true;
    return task.status === filterStatus;
  })
  .sort((a,b) => {
    if(filterStatus === "all") {
        if(a.status === "pending" && b.status === "completed") return -1;
        if(a.status === "completed" && b.status === "pending") return 1;
        return 0;
    }
    return 0;
  })
 

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-white px-6 py-6">
      {/* Title (scrolls normally) */}
      <div className="flex items-center justify-between">
      <h1 className="text-4xl font-bold text-amber-600 text-center mb-6">{`${username}'s Tasks`}</h1>
      <button onClick={() => handleLogout()} className="bg-amber-500 px-2 py-2 rounded-xl text-white cursor-pointer">Logout</button>
      </div>
      {/* Sticky filter + add button bar */}
      <div className="sticky top-6 z-10 bg-amber-100 py-4 px-6 rounded-xl shadow-md flex justify-between items-center">
     <select className="w-1/3 md:w-1/4 bg-white text-gray-800 border border-amber-300 rounded-xl py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 hover:border-amber-400 transition duration-200"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
     >
    <option value="all">All</option>
    <option value="completed">Completed</option>
    <option value="pending">Pending</option>
  </select>
  <Link to={`/${username}/dashboard/addtask`}>
    <button className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-xl text-white font-semibold shadow-md transition duration-300 cursor-pointer">
      + Add Task
    </button>
  </Link>
</div>


      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-10">
          You have no tasks yet. 
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto mt-5">
          {filteredTasks.map((task) => (
            <div
            key={task._id}
            className={`p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer flex flex-col justify-between h-50 ${
              task.status === "completed" ? "bg-green-100" : "bg-white"
            }`}
          >          
              <div className="overflow-hidden">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{task.title}</h2>
                <p className="text-gray-600 mb-4">{task.description || "No description provided."}</p>
              </div>
              <div className="flex w-full justify-between">
                <p className={`text-sm font-medium ${task.status === "completed" ? "text-green-600" : "text-yellow-500"}`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </p>
                <button onClick={() => handleDelete(task._id)} className="px-1 py-2 bg-red-400 cursor-pointer text-white rounded-xl">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
