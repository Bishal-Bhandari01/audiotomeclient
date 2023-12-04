import React from "react";
import SideNav from "../theme/SideNav";
import DashCard from './DashCard'
import DashTable from "./DashTable";

export default function DashBoard() {
  return (
    <>
      <SideNav />
      <main className="container mt-3">
        <div className="fs-3 fw-bold">Dashboard</div>
        <div className="mt-3"><DashCard/></div>
        <div className="mt-4 text-dark">
          <DashTable />
        </div>
      </main>
    </>
  );
}
