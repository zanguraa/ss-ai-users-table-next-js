"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import User from "../../types/type";
import DeleteModal from "./DeleteModal";
import Link from "next/link";

type Props = {
  store: User;
};




const UserTable: React.FC<Props> = ({ store }) => {
  return (
    <div>
      <Table className="border-2">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>City</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {store.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {/* Create a link to the dynamic route with the user's ID */}
                <Link href={`/${user.id}`}>
                  <p>{user.id}</p>
                </Link>
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address.city}</TableCell>
              <DeleteModal store={user} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
