import React, { useState } from "react";
import Auth from "./Auth";
import Library from "./Library";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser"))
  );

  const handleLogin = (userData) => {
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <Library user={user} onLogout={handleLogout} />
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
