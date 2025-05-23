import React from "react";
import { useLoaderData } from "react-router";

const UpdateUser = () => {
  const user = useLoaderData();
  console.log(user);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const updatedUser = { name, email };
    console.log(updatedUser);
    // update user info in the db
    fetch(`http://localhost:5000/users/${user._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("after update", data);
        if (data.modifiedCount) {
          console.log("update done", data);
        }
      });
  };

  return (
    <div>
      <form action="" onSubmit={handleUpdateUser}>
        <input defaultValue={user.name} type="text" name="name" id="" />
        <br />
        <input defaultValue={user.email} type="email" name="email" id="" />
        <br />
        <input type="submit" value="Update User" />
      </form>
    </div>
  );
};

export default UpdateUser;
