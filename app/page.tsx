"use client";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../slices/userSlice";
import { useEffect, useRef } from "react";
import { AppDispatch, RootState } from "../store/store";
import { User } from "lucide-react";
import UserTable from "@/components/UserTable";

export default function Home() {
  const ref = useRef(false);
  const { entities, loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

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
          <UserTable store={entities} />
        </div>
      )}
    </div>
  );
}
