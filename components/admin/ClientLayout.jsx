"use client";

import { useState } from "react";
import { Sidebar } from "./SIdeBar";

const ClientLayout = ({  states,tasks, users, settings }) => {
  const [activePage, setActivePage] = useState("states");

  return (
    <>
      <Sidebar activePage={activePage} setActivePage={setActivePage}/>
      {activePage === "states" && states}
      {activePage === "tasks" && tasks}
      {activePage === "users" && users}
      {activePage === "settings" && settings}
    </>
  );
};

export default ClientLayout;