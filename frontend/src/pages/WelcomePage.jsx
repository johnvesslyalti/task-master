import { Link } from "react-router-dom";

export default function WelcomePage() {
    return(
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl">Welcome to Task master</h1>
            <p className="mt-3">Where you can manage your tasks...</p>
            <div className="flex gap-4 mt-4">
                <Link to="/register">
                    <button className="bg-amber-500 p-3 cursor-pointer text-white rounded-xl">Register</button>
                </Link>
                <Link to="/login">
                    <button className="bg-amber-500 p-3 cursor-pointer text-white rounded-xl">Login</button>
                </Link>
            </div>
        </div>
    )
}