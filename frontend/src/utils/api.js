import axios from "axios";

const api = axios.create({
    baseURL: "https://task-master-lxkh.onrender.com/api",
});

export default api;