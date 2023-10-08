"use client";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../slices/userSlice";
import { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "../store/store";
import { User } from "lucide-react";
import UserTable from "@/components/UserTable";

export default function Home() {
  const ref = useRef(false);
  const { entities, loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = useState([]);

  const onEdit = async (id, name, email) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // setUsers((users) => [...users, data]);
        const updatedUsers = users.map((user) => {
          if (user.id === id) {
            user.name = name;
            user.email = email;
          }

          return user;
        });

        setUsers((users) => updatedUsers);
      })
      .catch((error) => console.log(error));
  };

  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  console.log(entities);

  useEffect(() => {
    if (ref.current === false) {
      dispatch(fetchUsers());
    }
    ref.current = true;
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <UserTable
            store={entities}
            id={user.id}
            key={user.id}
            name={user.name}
            email={user.email}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      )}
    </div>
  );
}
