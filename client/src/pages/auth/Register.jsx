import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { registerUser } from "../../api/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await registerUser(formData);

      toast.success(
        "Account created successfully"
      );

      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white grid md:grid-cols-2">

      {/* Left Side */}
      <div className="hidden md:flex flex-col justify-center px-20 bg-gradient-to-br from-purple-700 to-blue-600">

        <h1 className="text-5xl font-bold leading-tight">
          Start Building Your Future
        </h1>

        <p className="mt-6 text-lg text-blue-100">
          Create your account and organize your job search effectively.
        </p>

      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-6">

        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-2">
            Create Account
          </h2>

          <p className="text-zinc-400 mb-8">
            Register to get started
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label className="block mb-2 text-sm">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

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
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-xl font-semibold"
            >
              Register
            </button>

          </form>

          <p className="text-zinc-400 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
};

export default Register;