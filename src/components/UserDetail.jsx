import React from "react";
import { useLoaderData } from "react-router";

const UserDetail = () => {
  const user = useLoaderData();
  console.log(user);

  return (
    <div>
      <h2>User Details</h2>
      <h4>Name: {user.name}</h4>
      <h4>Email: {user.email}</h4>
    </div>
  );
};

export default UserDetail;
