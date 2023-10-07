"use client";
// pages/[id].tsx
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserById } from "../slices/userSlice";

const UserProfile: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  // Select user data from Redux store
  const user = useSelector((state) => state.user.users[Number(id)]);

  // Fetch user data when the component mounts
  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(Number(id)));
    }
  }, [id, dispatch]);

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>User ID: {id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Add other user properties here */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
