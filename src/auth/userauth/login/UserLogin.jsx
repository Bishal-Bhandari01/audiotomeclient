import React, { useState } from "react";
import "./UserLogin.css";
import logo from "../../../assets/New Project.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginUser } from "../../../environment/UserService";
import { storageSetter } from "../../../environment/StorageManager";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Notify = () => {
    if (email === "") toast.error("Provide valid Email");
    else if (password === "") toast.error("Provide valid Password");
    else Submit();
  };

  const Submit = async () => {
    const data = {
      email: email,
      password: password
    };
    const userData = await LoginUser(data);
    const datas = userData.data;
    if (!userData) {
      toast.error("Invalid email and password");
      return;
    }
    var user = storageSetter(datas.user);
    var role = user.role;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", datas.jwt);
    if (role === "ADMIN") {
      navigate("/admin/dashboard")
    } else {
      navigate("/home")
    }
  };
  return (
    <div className="login">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="colored"
      />
      <div className="d-flex flex-column align-items-center justify-content-center h-100">
        <img src={logo} className="logoImg mb-2" alt="Logo" />
        <div className="text-light fs-6 fw-bold">
          Where Books Come to Life in Your Ears
        </div>
        <div
          className="card mt-3"
          style={{ background: "#BD00FF", width: "25rem" }}
        >
          <div className="card-body">
            <div className="form-group my-3">
              <label className="text-light">Email Address</label>
              <input
                className="form-control userLoginFormControl"
                type="email"
                onChange={e => {
                  setEmail(e.target.value);
                }}
                required="required"
              />
            </div>
            <div className="form-group my-3">
              <label className="text-light">Password</label>
              <input
                className="form-control userLoginFormControl"
                type="password"
                required="required"
                onChange={e => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="text-end">
              <Link to="/reset-password" className="fst-italic text-light">
                Forgot password
              </Link>
            </div>
            <div className="d-flex justify-content-center my-3">
              <button
                type="btn"
                className="btn btn-primary btn-lg"
                onClick={Notify}
              >
                Login
              </button>
            </div>
            <div className="text-center text-light my-3">
              <p className="text-light">
                Doesn't have account:{" "}
                <Link
                  to="/register"
                  className="text-light text-decoration-underline"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
