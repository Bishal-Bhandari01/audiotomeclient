import React from "react";
import Navbar from "../theme/Navbar";
import SideNav from "../adminScreen/theme/SideNav";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  const user = localStorage.getItem("user");

  return (
    <>
      <div style={{ backgroundColor: "#BD00FF", height: "100vh" }}>
        {user !== null ? user.role !== "ADMIN" ? <Navbar /> : <SideNav /> : ""}
        <div
          className="container mt-3 d-flex flex-row justify-content-center align-items-end"
          style={{ height: "75vh" }}
        >
          <div className="card">
            <div className="card-body">
              <h1 style={{ fontSize: "13rem", fontWeight: "bold" }}>404</h1>
              <h3 className="text-center fw-bold">Page not found</h3>
              <div className="mt-4 text-center">
                <Link
                  to="/"
                  className="btn btn-outline-primary rounded-pill"
                  data-mdb-ripple-color="dark"
                >
                  <i className="fas fa-arrow-left"></i> Go back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
