import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register", // ✅ FIXED URL
        formData
      );

      alert(res.data.message || "User registered successfully!");

      // reset form
      setFormData({
        name: "",
        email: "",
        password: "",
      });

    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Error registering user"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px]">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 disabled:bg-gray-400"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default App;