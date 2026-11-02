
"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/subscribers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setEmail("");
      } else {
        setMessage(data.message || "Something went wrong!");
      }
    } catch (error) {
      setMessage("Unable to connect to server!");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Stay Connected
        </h1>

        <p className="text-gray-500 text-center mt-3">
          Enter your email address to get in touch with us.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <label className="block text-gray-700 font-medium mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-5 hover:bg-blue-700"
          >
            Submit Email
          </button>
        </form>

        {message && (
          <p className="text-center text-green-600 mt-4">
            {message}
          </p>
        )}

      </div>
    </main>
  );
}
