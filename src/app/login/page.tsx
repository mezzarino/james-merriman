"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: "/",
    });

    if (result?.error) {
      setError("Invalid username or password");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-24 p-8 border rounded">
      <h1 className="text-2xl font-semibold mb-6">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}