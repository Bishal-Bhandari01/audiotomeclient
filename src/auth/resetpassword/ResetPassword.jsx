import React, { useState } from "react";
import logo from "../../assets/New Project.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ForgotPassword } from "../../environment/UserService";
import "../userauth/login/UserLogin.css";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const Notify = () => {
    if (email === "") toast.error("Provide valid Email");
    else Submit();
  };

  const Submit = async () => {
    const resp = await ForgotPassword(email);
    const datas = resp.data;
    if (datas === "User not found") {
      toast.error("User not found ! Please register before trying again.");
      return;
    }
    navigate("/login");
  };

  return (
    <div className="forgotPassword">
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
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="d-flex justify-content-center flex-column my-3">
              <button
                type="btn"
                className="btn btn-primary btn-lg"
                onClick={Notify}
              >
                Reset
              </button>
              <Link
                to="/login"
                className="fst-italic text-light my-4 text-decoration-underline text-center "
              >
                <i className="fas fa-arrow-left mx-2"></i>Go Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
