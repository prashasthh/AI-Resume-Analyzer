import { useEffect } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "../libb/puter";

export default function Gatekeeper() {
  const { isLoading, auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      console.log('[Gatekeeper] Still loading...');
      return;
    }
    
    console.log('[Gatekeeper] Auth status:', {
      isAuthenticated: auth.isAuthenticated,
      user: auth.user
    });
    
    if (auth.isAuthenticated) {
      console.log('[Gatekeeper] Authenticated, redirecting to /home');
      navigate("/home", { replace: true });
    } else {
      console.log('[Gatekeeper] Not authenticated, redirecting to /auth');
      navigate("/auth", { replace: true });
    }
  }, [isLoading, auth.isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-2xl text-white bg-gradient-to-br from-purple-900 via-black to-black">
      <div className="text-center">
        <div className="animate-pulse mb-4">Loading...</div>
        <div className="text-sm text-gray-400">Checking authentication status</div>
      </div>
    </div>
  );
}
