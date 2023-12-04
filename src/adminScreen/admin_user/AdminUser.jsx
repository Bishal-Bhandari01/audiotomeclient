import React, { useEffect, useState } from "react";
import SideNav from "../theme/SideNav";
import { GetUser } from "../../environment/UserService";
import "./adminuser.css";

export default function AdminUser() {
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");

  const GetUserDataFromApi = async () => {
    const resp = await GetUser().then((response) => response.data);
    setUserData(resp.response);
  };

  useEffect(() => {
    GetUserDataFromApi();
    const timer = setInterval(() => GetUserDataFromApi(), 15000);
    return () => clearInterval(timer);
  }, []);

  // const userData = [
  //   {
  //     id: 1,
  //     firstName: "james",
  //     lastName: "bond",
  //     middleName: "",
  //     address: "city",
  //     dob: "2027-01-01",
  //   },
  //   {
  //     id: 1,
  //     firstName: "heavy",
  //     lastName: "bond",
  //     middleName: "",
  //     address: "city",
  //     dob: "2027-01-01",
  //   },
  //   {
  //     id: 1,
  //     firstName: "light",
  //     lastName: "bond",
  //     middleName: "",
  //     address: "city",
  //     dob: "2027-01-01",
  //   },
  //   {
  //     id: 1,
  //     firstName: "james",
  //     lastName: "bond",
  //     middleName: "",
  //     address: "city",
  //     dob: "2028-03-01",
  //   },
  // ];

  function calculate_age(dob) {
    const d = new Date(dob);
    var diff_ms = Date.now() - d.getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  return (
    <>
      <SideNav />
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-6">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search here..."
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(text) => {
                  setSearch(text.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="d-flex flex-row justify-content-end">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  window.location.assign("/admin/adduser");
                }}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-center mt-4">
          {userData
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.firstName.toLowerCase().includes(search);
            })
            .filter((item) => {
              return item.role === "ADMIN" ? "" : item;
            })
            .map((item, index) => {
              return (
                <div
                  className="card mx-2 mt-2"
                  key={index}
                  style={{ border: "none", width: "15rem" }}
                >
                  <div className="card-body text-center">
                    <img
                      src={item.uprofile}
                      className="rounded userProfile"
                      alt="Don't have a profile"
                    />
                    <div className="fs-5 fw-bold">
                      {item.firstName} {item.middleName} {item.lastName}
                    </div>
                    <div className="fs-6">{calculate_age(item.dob)}</div>
                    <div className="fs-6">{item.address}</div>
                  </div>
                  <div className="card-footer d-flex justify-content-evenly">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        window.location.assign(`/admin/userdetails/${item.id}`);
                      }}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
