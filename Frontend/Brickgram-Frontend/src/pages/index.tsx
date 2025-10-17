import { Button } from "@heroui/react";
import React from "react";

function Index() {
    const handleLogout = () => {
    localStorage.removeItem("token")
    sessionStorage.removeItem("token")
    window.location.href = "/login"
  }
  return (
  <div className="text-foreground bg-foreground">
    <h1 className="text-amber-900">Hello!</h1>
              <Button color="danger" onPress={handleLogout}>
            Log out
          </Button>
  </div>
  );
}

export default Index