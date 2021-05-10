// NPM Packages
import React, { useEffect, useState } from "react";

// Project files
import ProfileCard from "../../components/profile/ProfileCard";
import UserApi from "../../api/UserApi";

export default function ProfilePage() {
  // Local state
  const [thisUser, setThisUser] = useState({});

  // Methods
  useEffect(() => {
    UserApi.getUser()
      .then(({ data }) => {
        setThisUser(data);
      })
      .catch((err) => console.error(err));
  }, [setThisUser]);

  return (
    <div className="ProfilePage">
      <h1>Profile</h1>
      <ProfileCard thisUser={thisUser} />
    </div>
  );
}
