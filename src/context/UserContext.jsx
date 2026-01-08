import { createContext, useContext, useEffect, useState } from "react";
import { fetchUsers } from "../services/userService";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      const data = await fetchUsers();
      setUsers(data);
      setCurrentUser(data[0]); // user par défaut
    }

    loadUsers();
  }, []);

  const switchUser = (user) => {
    setCurrentUser(user);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        switchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return context;
}
