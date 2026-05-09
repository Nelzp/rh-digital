import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Session {
  user: User;
}

export const authClient = {
  useSession: () => {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // TODO: Implement session retrieval from backend or localStorage
      // For now, returning a mock session
      const mockSession: Session = {
        user: {
          id: "1",
          name: "Usuário",
          email: "usuario@example.com",
        },
      };

      setSession(mockSession);
      setIsLoading(false);
    }, []);

    return {
      data: session,
      isLoading,
      isAuthenticated: !!session,
    };
  },
};
