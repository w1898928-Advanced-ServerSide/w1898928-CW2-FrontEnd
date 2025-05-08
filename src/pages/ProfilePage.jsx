import React from "react";
import { useParams } from "react-router-dom";
import UserProfile from "../components/user/UserProfile";

const ProfilePage = () => {
  const { username } = useParams();

  return (
    <div className="profile-page">
      <UserProfile username={username} />
    </div>
  );
};

export default ProfilePage;
