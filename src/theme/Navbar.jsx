import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/New Project.png";
import DefaultUser from "../assets/defaultuser.png";

const NavMenu = [
  { name: "Home", link: "/home" },
  { name: "Audio Book", link: "/audiobooks" },
  { name: "Notes", link: "/notes" },
  { name: "About Us", link: "/aboutus" },
  { name: "FAQ", link: "/faq" }
];

const SubMenu = [
  { name: "Profile", link: "/profile" },
  { name: "Listen List", link: "#" },
  { name: "Change password", link: "/change-password" }
];

export default function NavBar() {

  const userData = localStorage.getItem("user")

  const navigate = useNavigate();
  if (localStorage === null) {
    window.location.assign('/login');
  }
  else {
    if (localStorage.getItem("user") === null || localStorage.getItem("token") === null) {
      navigate("/login");
    } else {
      if (userData.role === "ADMIN") {
        navigate("/admin/dashboard");
      }
    }
  }


  // const userData = localStorage.getItem("user");
  // if (userData.role === "ADMIN") {
  //   navigate("/admin/dashboard");
  // }

  // const checkfromapi = (token) => {
  //   let decodedToken = jwt_decode(token);
  //   let currentDate = new Date();

  //   // JWT exp is in seconds
  //   if (decodedToken.exp * 1000 < currentDate.getTime()) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // const getTokenChecked = () => {
  //   const getData = checkfromapi(localStorage.getItem('token'));
  //   const bool = getData;
  //   if (bool === true) {
  //     localStorage.clear();
  //     window.location.assign("/login");
  //   }
  // }

  const CheckROle = () => {
    if (localStorage !== null) {
      if (localStorage.getItem("user") === null || localStorage.getItem("token") === null) {
        localStorage.clear();
        navigate("/login");
      } else {
        if (userData.role === "ADMIN") {
          navigate("/admin/dashboard");
        }
      }
    }
    else {
      navigate("/login");
    }
  }

  const Profile = () => {
    if (localStorage.getItem("user") == null) {
      navigate("/login")
    }
    else {
      return <UserProfile profile={userData.profileImage} />
    }
  }

  useEffect(() => {
    CheckROle();
    const timer = setInterval(() => {
      CheckROle()
    }, 10000)
    return () => clearInterval(timer)
  }, [])

  const Logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const DefUser = () => {
    return (
      <img
        src={DefaultUser}
        className="rounded-circle"
        height="35"
        alt="PIC"
        loading="lazy"
      />
    );
  };

  const UserProfile = profile => {
    return (
      <img
        src={profile}
        className="rounded-circle"
        height="30"
        alt="PIC"
        loading="lazy"
      />
    );
  };

  return (
    <nav className="row customrowcss sticky-top">
      <div className="col-sm-5 customcolcss d-flex justify-content-between align-items-center">
        <div className="mx-5">
          <Link className="navbar-brand mt-2 mt-lg-0" to={"/"}>
            <img src={logo} height="30" alt="AutoTome" loading="lazy" />
          </Link>
        </div>
      </div>
      <div className="col-sm-7">
        <nav className="navbar navbar-expand-lg text-light d-flex align-items-center">
          <div className="container mx-5 p-2">
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-3 mb-lg-0">
                {NavMenu.map((items, index) => {
                  return (
                    <li className="nav-item" key={index}>
                      <Link to={items.link} className="nav-link text-light">
                        {items.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="d-flex align-items-center">
                <div className="dropdown">
                  <Link
                    className="dropdown-toggle d-flex align-items-center hidden-arrow"
                    to={"#"}
                    id="navbarDropdownMenuAvatar"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <Profile />
                  </Link>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuAvatar"
                  >
                    {SubMenu.map((items, index) => {
                      return (
                        <li key={index}>
                          <Link
                            className="dropdown-item text-light"
                            to={items.link}
                          >
                            {items.name}
                          </Link>
                        </li>
                      );
                    })}
                    <li>
                      <Link
                        className="dropdown-item text-light"
                        to={"/login"}
                        onClick={Logout}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </nav>
  );
}
