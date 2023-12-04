import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/New Project.png";
import DefaultUser from "../../assets/defaultuser.png";

const NavMenu = [
  { name: "Dashboard", link: "/admin/dashboard" },
  { name: "Audio Book", link: "/admin/audiobook" },
  { name: "User", link: "/admin/user" }
];

const SubMenu = [
  { name: "Profile", link: "/admin/profile" },
  { name: "Change password", link: "/admin/change-password" }
];
export default function SideNav() {

  const userData = localStorage.getItem("user");
  if (userData.role === "USER") {
    navigate("/");
  }

  const [userProfile, setUserProfile] = useState(null)

  const DefUser = () => {
    return (
      <img
        src={DefaultUser}
        className="rounded-circle"
        height="35"
        alt="DefPIC"
        loading="lazy"
      />
    );
  };

  const UserProfile = () => {
    return (
      <img
        src={userData.profileImage}
        className="rounded-circle"
        height="30"
        alt="PIC"
        loading="lazy"
      />
    );
  };

  const FetchUserData = async () => {
    const userData = localStorage.getItem("user");
    if (userData.uprofile !== null || userData.uprofile !== "") {
      setUserProfile(userData.uprofile);
    }
  }

  const Logout = () => {
    localStorage.clear();
    navigate("/login")
  }

  useEffect(() => {
    FetchUserData();
  }, [])

  return (
    <>
      <nav className="row customrowcss sticky-top">
        <div className="col-sm-5 customcolcss d-flex justify-content-between align-items-center">
          <div className="mx-5">
            <Link className="navbar-brand mt-2 mt-lg-0" to={"/admin/dashboard"}>
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
                <i className="fas fa-bars"></i>
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
                      {userData.profileImage ? <UserProfile /> : <DefUser />}
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
    </>
  );
}
