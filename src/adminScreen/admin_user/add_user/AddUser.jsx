import React, { useEffect, useState } from "react";
import SideNav from "../../theme/SideNav";
import {
  PostUserData,
  PostUserProfileImage
} from "../../../environment/UserService";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const [imageBase, setImageBase] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const [status, setStatus] = useState("DRAFT");

  const [previewImage, setPreviewImage] = useState("");

  const navigate = useNavigate();

  const HandleImage = (e) => {
    setImageBase(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const userData = {
    firstName: firstName !== "" ? firstName : "John",
    middleName: middleName !== "" ? middleName : " ",
    lastName: lastName !== "" ? lastName : "Doe",
    uProfile:
      previewImage === ""
        ? "https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
        : previewImage,
    dob: dob,
    gender: gender
  };

  const onSubmit = async () => {
    if (firstName === "") {
      toast.error("First name is required");
      return;
    }
    if (lastName === "") {
      toast.error("Last name is required");
      return;
    }
    if (email === "") {
      toast.error("Email is required");
      return;
    }
    if (password === "") {
      toast.error("Password is required");
      return;
    }
    const form = new FormData();
    form.append("file", imageBase);
    const url = await PostUserProfileImage(form);
    const urlData = url.data;
    const userProfile = urlData.fileLink;
    const toBeSavedUserData = {
      firstName: firstName !== "" ? firstName : "John",
      middleName: middleName !== "" ? middleName : " ",
      lastName: lastName !== "" ? lastName : "Doe",
      email: email !== "" ? email : "test@example.com",
      password: password !== "" ? password : " ",
      uprofile: userProfile,
      status: status,
      dob: dob,
      gender: gender,
      registerDate: new Date().toISOString().split("T")[0]
    };
    await PostUserData(JSON.stringify(toBeSavedUserData));
    navigate("/admin/user");
  };

  const DraftBadge = () => {
    return <div className="badge fs-6 badge-warning">DRAFT</div>;
  };

  const PublishedBadge = () => {
    return <div className="badge fs-6 badge-success">PUBLISHED</div>;
  };

  const GetFullName = (firstName, middleName, lastName) => {
    const fullName = firstName + " " + middleName + " " + lastName;
    return fullName;
  };

  //   useEffect(() => {
  //   });

  const onSelectHandle = (e) => {
    setGender(e.target.value);
  };

  return (
    <>
      <SideNav />
      <div className="container mt-4">
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
        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                <div className="fs-4 fw-bold text-center">User Information</div>
                <div className="row mt-3 mb-3">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Middle name"
                        onChange={(e) => setMiddleName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="date"
                        placeholder="DoB (Date of Birth)"
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <select className="form-control" onChange={onSelectHandle}>
                      <option value="null">Select Options</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <input
                    type="file"
                    className="form-control"
                    accept="image/png"
                    onChange={(e) => HandleImage(e)}
                  />
                </div>
                <div className="text-center">
                  <div className="form-check form-check-inline mt-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="option1"
                      defaultChecked
                      onClick={() => setStatus("DRAFT")}
                    />
                    <label className="form-check-label" for="inlineRadio1">
                      Draft
                    </label>
                  </div>

                  <div className="form-check form-check-inline mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      onClick={() => setStatus("PUBLISHED")}
                      value="option2"
                    />
                    <label className="form-check-label" for="inlineRadio2">
                      Publish
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => {
                      onSubmit(e);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body text-center">
                <div className="fs-4 fw-bold text-center mb-3">Preview</div>
                <div className="d-flex justify-content-center mb-3">
                  <img
                    src={userData.uProfile}
                    className="rounded"
                    style={{ width: "12rem" }}
                    alt="user"
                  />
                </div>
                <h4>
                  {GetFullName(
                    userData.firstName,
                    userData.middleName,
                    userData.lastName
                  )}
                </h4>
                <h6>{userData.email}</h6>
                <h6>{userData.dob}</h6>
                <h6>{userData.address}</h6>
                <h6>Gender: {userData.gender}</h6>
              </div>
              <div className="card-footer d-flex justify-content-around">
                {status !== "DRAFT" ? <PublishedBadge /> : <DraftBadge />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
