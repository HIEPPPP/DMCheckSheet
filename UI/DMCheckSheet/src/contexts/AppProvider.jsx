import { AuthProvider } from "./AuthContext";
import { StatusProvider } from "./StatusContext";
import { UserProvider } from "./UserContext";

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <StatusProvider>{children}</StatusProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppProvider;
