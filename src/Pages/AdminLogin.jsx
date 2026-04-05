import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Github, LogOut, ShieldAlert } from "lucide-react";
import AdminDashboard from "../Components/AdminDashboard"; // Adjust path if needed

function AdminLogin() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const MY_ADMIN_EMAIL = "tanmaymevada24@gmail.com";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/admin`
      }
    });
    if (error) console.error("Error logging in:", error.message);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // 1. Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-t-2 border-b-2 rounded-full border-blue animate-spin"></div>
      </div>
    );
  }

  // 2. Not Logged In View
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md p-8 text-center border shadow-xl bg-dark2 border-blue/20 rounded-2xl">
          <h2 className="mb-2 text-2xl font-bold text-white">Admin Access</h2>
          <p className="mb-8 text-sm text-gray-400">
            Secure login for portfolio management.
          </p>

          <button
            onClick={signInWithGithub}
            className="flex items-center justify-center w-full gap-3 px-6 py-3 transition-colors border rounded-lg bg-blue/20 border-blue/40 text-blue hover:bg-blue/30 focus:outline-none"
          >
            <Github size={20} />
            Continue with GitHub
          </button>
        </div>
      </div>
    );
  }

  // 3. Logged In, but WRONG Email
  if (session.user.email !== MY_ADMIN_EMAIL) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md p-8 text-center border shadow-xl border-red-500/20 bg-dark2 rounded-2xl">
          <div className="flex justify-center mb-4 text-red-500">
            <ShieldAlert size={48} />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-white">Access Denied</h2>
          <p className="mb-6 text-sm text-gray-400">
            The account <strong>{session.user.email}</strong> does not have administrator privileges.
          </p>

          <button
            onClick={signOut}
            className="px-6 py-2 text-gray-300 transition-colors border border-gray-600 rounded-lg hover:bg-gray-800"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  // 4. Correct Email -> Render Dashboard
  return (
    <div className="flex flex-col min-h-screen">
      {/* Admin Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b bg-dark2 border-blue/20">
        <div className="font-bold tracking-wider text-blue">PORTFOLIO ADMIN</div>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span className="hidden sm:inline">{session.user.email}</span>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-3 py-1.5 transition-colors border rounded-lg border-blue/20 hover:bg-blue/10 text-blue"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      {/* Admin Content Area */}
      <main className="flex-1 w-full p-6 mx-auto max-w-7xl sm:p-10">
        <AdminDashboard />
      </main>
    </div>
  );
}

export default AdminLogin;