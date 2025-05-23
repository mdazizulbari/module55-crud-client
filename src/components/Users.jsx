import React, { use, useState } from "react";
import { Link } from "react-router";
import "../index.css"

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);
  const [users, setUsers] = useState(initialUsers);
  console.log(users);

  const handleAddUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const newUser = { name, email };
    console.log(newUser);
    // create user in db
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data after creating in db ", data);
        if (data.insertedId) {
          newUser._id = data.insertedId;
          const newUsers = [...users, newUser];
          setUsers(newUsers);
          alert("user added successfully");
          event.target.reset();
        }
      });
  };

  const handleUserDelete = (id) => {
    console.log("delete user", id);
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          const remainingUsers = users.filter((user) => user._id !== id);
          setUsers(remainingUsers);
          console.log("after delete", data);
        }
      });
  };


  return (
    <div>
      {/* add user */}
      <div className="">
        <h4>Total Users: {users.length} </h4>
        <form action="" onSubmit={handleAddUser}>
          <input type="text" name="name" id="" placeholder="Name" />
          <br />
          <input type="email" name="email" id="" placeholder="Email" />
          <br />
          <input type="submit" value="Add User" />
        </form>
      </div>
      {/* show users */}
      <div className="">
        {users.map((user) => (
          <p key={user._id}>
            {user.name} : {user.email}
            <Link to={`/users/${user._id}`}>Details</Link>
            <Link to={`/update/${user._id}`}>Edit</Link>
            <button onClick={() => handleUserDelete(user._id)}>X</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
