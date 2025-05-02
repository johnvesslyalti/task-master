import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 to-gray-700">
      <div className="bg-gray-800 p-10 rounded-3xl shadow-xl flex flex-col items-center max-w-md w-full">
        <h1 className="text-4xl font-bold text-amber-300 mb-4">Task Master</h1>
        <p className="text-gray-300 text-center mb-8">
          Organize your tasks efficiently and stay productive!
        </p>
        <div className="flex gap-6">
          <Link to="/register">
            <button className="bg-amber-400 hover:bg-amber-500 transition-all duration-300 p-3 px-6 text-gray-900 font-semibold rounded-2xl shadow-md cursor-pointer">
              Register
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-amber-400 hover:bg-amber-500 transition-all duration-300 p-3 px-6 text-gray-900 font-semibold rounded-2xl shadow-md cursor-pointer">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
