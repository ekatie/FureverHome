import React from "react";
import { useSelector } from "react-redux";

function UserProfile() {
  const user = useSelector((state) => state.user);

  if (!user) {
    return <h1>Not logged in</h1>;
  }

  return (
    <div>
      <h1>User Profile</h1>
    </div>
  );
}

export default UserProfile;
