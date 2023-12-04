import React, { useState } from "react";
import "./UserRegister.css";
import logo from "../../../assets/New Project.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PostUserData, Registration } from "../../../environment/UserService";

export default function UserRegister() {
  const [firstName, setFirstName] = useState("");
  const [MiddleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");

  const notify = () => {
    if (firstName === "") {
      toast.error("Provide the valid first name.");
    } else if (lastName === "") {
      toast.error("Provide the valid surname.");
    } else if (email === "") {
      toast.error("Provide the valid email address.");
    } else if (password === "") {
      toast.error("Provide the valid password.");
    } else if (password.length < 6) {
      toast.error("Password should be more than 6 character long.");
    } else if (dob === "") {
      toast.error("Provide the valid date of birth.");
    } else Submit();
  };

  const Submit = () => {
    let role = "USER";
    const UserData = {
      firstName: firstName,
      middleName: MiddleName,
      lastName: lastName,
      email: email,
      password: password,
      dob: dob,
      role: role
    };
    const userData = JSON.stringify(UserData);
    Registration(userData);
    window.location.assign("/login");
  };

  return (
    <div className="register">
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
          style={{ background: "#BD00FF", width: "30rem" }}
        >
          <div className="card-body">
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group my-3">
                  <label className="text-light">First Name</label>
                  <input
                    className="form-control userRegisterFormControl"
                    type="text"
                    onChange={text => setFirstName(text.target.value)}
                    required="required"
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group my-3">
                  <label className="text-light">Middle Name</label>
                  <input
                    className="form-control userRegisterFormControl"
                    type="text"
                    onChange={text => setMiddleName(text.target.value)}
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group my-3">
                  <label className="text-light">Last Name</label>
                  <input
                    className="form-control userRegisterFormControl"
                    type="text"
                    required="required"
                    onChange={text => setLastName(text.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group my-3">
              <label className="text-light">Email Address</label>
              <input
                className="form-control userRegisterFormControl"
                type="email"
                required="required"
                onChange={text => setEmail(text.target.value)}
              />
            </div>
            <div className="form-group my-3">
              <label className="text-light">Password</label>
              <input
                className="form-control userRegisterFormControl"
                type="password"
                required="required"
                onChange={text => setPassword(text.target.value)}
              />
            </div>
            <div className="form-group my-3">
              <label className="text-light">Date Of Birth</label>
              <input
                className="form-control"
                type="date"
                required="required"
                onChange={text => setDob(text.target.value)}
              />
            </div>
            <div className="d-flex justify-content-center my-3">
              <button
                type="btn"
                className="btn btn-primary btn-lg"
                onClick={() => {
                  notify();
                }}
              >
                Register
              </button>
            </div>
            <div className="text-center text-light my-3">
              <p className="text-light">
                Does have account:{" "}
                <Link to="/" className="text-light text-decoration-underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
