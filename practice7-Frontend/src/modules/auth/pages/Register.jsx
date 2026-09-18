import React, { useState } from "react";
import useApi from "../../shared/useApi";
import { useAuthContext } from "../context/useAuthContext";
import { useNavigate } from "react-router";

const Register = () => {
  const api = useApi();
  const authContext = useAuthContext();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    authContext.setAccessToken(response.data.accessToken);
    authContext.setUser(response.data.data.user);

    console.log(response.data);

    navigate("/profile");
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#09090b] p-4 text-zinc-100 selection:bg-zinc-800">
      <form
        className="w-full max-w-sm flex flex-col gap-3.5 p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 shadow-2xl backdrop-blur-xl"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/90 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all duration-200 focus:border-zinc-600 focus:bg-zinc-900/80 focus:ring-2 focus:ring-zinc-700/40"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/90 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all duration-200 focus:border-zinc-600 focus:bg-zinc-900/80 focus:ring-2 focus:ring-zinc-700/40"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/90 text-sm text-zinc-100 placeholder-zinc-500 tracking-wider outline-none transition-all duration-200 focus:border-zinc-600 focus:bg-zinc-900/80 focus:ring-2 focus:ring-zinc-700/40"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        <button
          type="submit"
          className="w-full mt-1.5 py-2.5 px-4 rounded-xl bg-zinc-100 text-zinc-950 text-sm font-medium transition-all duration-200 hover:bg-white hover:shadow-lg hover:shadow-zinc-100/5 active:scale-[0.98]"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
