import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { FaLinkedin, FaWhatsapp, FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const phoneNumber = "9566469396";
  const message = "Hello, I would like to get more information!";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  const linkedinUrl =
    "https://www.linkedin.com/in/nagaraj-thangaraj-2ba836247/";

  const { login } = useAuth();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication check
    if (username === "ven" && password === "ven@1234") {
      login();
      navigate("/admin");
      toast.success("Login successful!");
    } else {
      toast.error("Login failed!");
    }
  };

  return (
    <div className="flex items-center  justify-center min-h-screen bg-gray-200 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md sm:max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 top-6"
            >
              {isPasswordVisible ? (
                <FaEyeSlash color="black" size={20} />
              ) : (
                <FaEye size={20} color="black" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Do You Wanna Admin Credentials? DM Me!
        </p>
        <div className="flex flex-col items-center justify-center gap-4 mt-4">
          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 text-xs font-bold"
          >
            <FaWhatsapp size={24} />
            <span className="mx-1">Contact Us on WhatsApp</span>
          </a>

          {/* LinkedIn Button */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300 text-xs font-bold"
          >
            <FaLinkedin size={24} />
            <span className="mx-1">Connect on LinkedIn</span>
          </a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
