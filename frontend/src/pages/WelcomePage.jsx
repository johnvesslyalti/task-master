import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-amber-100 to-white">
      <div className="bg-white p-10 rounded-3xl shadow-2xl flex flex-col items-center max-w-md w-full">
        <h1 className="text-4xl font-bold text-amber-600 mb-4">Task Master</h1>
        <p className="text-gray-600 text-center mb-8">
          Organize your tasks efficiently and stay productive!
        </p>
        <div className="flex gap-6">
          <Link to="/register">
            <button className="bg-amber-500 hover:bg-amber-600 transition-all duration-300 p-3 px-6 text-white font-semibold rounded-2xl shadow-md cursor-pointer">
              Register
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-amber-500 hover:bg-amber-600 transition-all duration-300 p-3 px-6 text-white font-semibold rounded-2xl shadow-md cursor-pointer">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
