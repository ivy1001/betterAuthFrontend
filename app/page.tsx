"use client";

import { authClient } from "@/lib/auth";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <p>Loading...</p>;

  return (
    <div>
      <h1>Mini App</h1>

      {session ? (
        <>
          <p>Logged in as: {session.user?.email}</p>
          <a href="/dashboard">Dashboard</a>
          <br />
          <button onClick={() => authClient.signOut()}>Logout</button>
        </>
      ) : (
        <>
          <p>Not logged in</p>
          <a href="/login">Login</a> | <a href="/signup">Signup</a>
        </>
      )}
    </div>
  );
}
