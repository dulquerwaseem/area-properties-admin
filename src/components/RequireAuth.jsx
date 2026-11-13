import { Navigate } from "react-router-dom";
import { useSession } from "../lib/useSession";

export default function RequireAuth({ children }) {
  const session = useSession();

  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-neutral-400">
        Loading…
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
