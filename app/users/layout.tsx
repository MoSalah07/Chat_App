import React from "react";
import SidebarComponent from "@/components/sidebar/SidebarComponent";
import getUsers from "@/actions/getUsers";
import UserList from "@/components/UserList";

async function Userslayout({ children }: { children: React.ReactNode }) {
  const users = await getUsers();
  return (
    <SidebarComponent>
      <UserList users={users} />
      <div className="h-full">{children}</div>
    </SidebarComponent>
  );
}

export default Userslayout;
