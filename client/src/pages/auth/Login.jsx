import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { loginUser } from "../../api/authApi";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      localStorage.setItem(
        "token",
        res.data.token
      );

      toast.success("Login successful");

      navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white grid md:grid-cols-2">

      {/* Left Side */}
      <div className="hidden md:flex flex-col justify-center px-20 bg-gradient-to-br from-blue-700 to-purple-600">

        <h1 className="text-5xl font-bold leading-tight">
          Welcome Back
        </h1>

        <p className="mt-6 text-lg text-blue-100">
          Track applications, manage interviews, and land your dream job.
        </p>

      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-6">

        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-2">
            Login
          </h2>

          <p className="text-zinc-400 mb-8">
            Sign in to continue
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label className="block mb-2 text-sm">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-xl font-semibold"
            >
              Login
            </button>

          </form>

          <p className="text-zinc-400 text-sm mt-6 text-center">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:underline"
            >
              Register
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
};

export default Login;