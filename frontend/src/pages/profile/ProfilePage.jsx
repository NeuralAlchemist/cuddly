// NPM Packages
import React from "react";

// Project files
import ProfileForm from "../../components/profile/ProfileForm";
import ProfileCard from "../../components/profile/ProfileCard";

export default function ProfilePage() {
  return (
    <div className="ProfilePage">
      <h1>PROFILE</h1>
      <ProfileCard />
      <ProfileForm />
    </div>
  );
}
