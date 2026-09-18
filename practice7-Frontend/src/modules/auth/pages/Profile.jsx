import { useState, useEffect } from "react";
import { useAuthContext } from "../context/useAuthContext";
import useApi from "../../shared/useApi";

const Profile = () => {
  const authContext = useAuthContext();
  const api = useApi();

  async function fetchProfile() {
    const response = await api.get("/auth/me");

    authContext.setUser(response.data.data.user);
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#09090b] p-4 text-zinc-100 selection:bg-zinc-800">
      <div className="w-full max-w-sm flex flex-col gap-3.5 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 shadow-2xl backdrop-blur-xl">
        <h1 className="text-base font-semibold tracking-tight text-zinc-100 pb-2 border-b border-zinc-800/60">
          Profile
        </h1>
        <p className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/90 text-sm text-zinc-300 font-normal">
          Name: {authContext.user?.name}
        </p>
        <p className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/90 text-sm text-zinc-300 font-normal">
          Email: {authContext.user?.email}
        </p>
      </div>
    </div>
  );
};

export default Profile;
