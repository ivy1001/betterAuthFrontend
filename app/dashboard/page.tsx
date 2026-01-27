"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Lock, Mail, Shield } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const fetchSecret = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/secret", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch secret");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) return <p>Loading...</p>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <button 
            onClick={() => authClient.signOut()}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">{session.user?.email}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Secret Message</h3>
              <p className="text-sm text-gray-600">Protected content from the server</p>
            </div>
          </div>

          {message ? (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
              <p className="text-gray-800 text-lg">{message}</p>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Click the button below to reveal your secret message</p>
              <button
                onClick={fetchSecret}
                disabled={loading}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-lg transition-all inline-flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Reveal Secret
                  </>
                )}
              </button>
              {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-indigo-600 mb-3">
              <Shield className="w-8 h-8" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Protected</h4>
            <p className="text-sm text-gray-600">Your data is secured with BetterAuth</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-purple-600 mb-3">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Encrypted</h4>
            <p className="text-sm text-gray-600">End-to-end encryption enabled</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-pink-600 mb-3">
              <Mail className="w-8 h-8" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Verified</h4>
            <p className="text-sm text-gray-600">Email authentication active</p>
          </div>
        </div>
      </main>
    </div>
  );
}