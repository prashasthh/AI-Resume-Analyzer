import { useEffect } from "react";
import { usePuterStore } from "../libb/puter";
import { useLocation, useNavigate } from "react-router";
export const meta = () => ([
  { title: 'Resumind | Auth' },
  { name: 'description', content: 'Log into your account' },
]);

const Auth = () => {
  const { isLoading, auth } = usePuterStore();

  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();
  useEffect(() => {
    // Only redirect if authenticated and there is a next param
    if (auth.isAuthenticated && next) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next]);
  return (
  <main className="bg-gradient-to-br from-purple-900 via-black to-black min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-xl rounded-3xl p-1">
        <section className="flex flex-col gap-8 rounded-3xl p-10 min-w-[340px] max-w-md bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-purple-400 to-blue-300 mb-2">
              Welcome Back
            </h1>
            <h2 className="text-lg sm:text-xl font-medium text-slate-300 mb-4">
              {auth.isAuthenticated ? "You are already signed in" : "Sign in to continue your journey"}
            </h2>
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse flex flex-col items-center">
                <div className="w-32 h-1 mb-2 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 rounded-full overflow-hidden relative">
                  <div className="absolute left-0 top-0 h-full w-1/3 bg-white/60 animate-loading-bar rounded-full" />
                </div>
                <p>Signing you in ...</p>
              </button>
/* Tailwind animation for loading bar */
// In your global CSS (e.g., app.css), add:
// .animate-loading-bar {
//   animation: loading-bar-move 1.2s linear infinite;
// }
// @keyframes loading-bar-move {
//   0% { left: 0; }
//   100% { left: 66%; }
// }
            ) : (
              auth.isAuthenticated ? (
                <button className="auth-button" onClick={auth.signOut}>
                  <p>Log Out</p>
                </button>
              ) : (
                <button className="auth-button" onClick={auth.signIn}>
                  <p>Log In</p>
                </button>
              )
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;