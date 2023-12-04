import React, { useEffect, useState } from "react";
import SideNav from "../../theme/SideNav";
import { useNavigate, useParams } from "react-router-dom";
import {
  DeleteUserById,
  UpdateUserProfileDataById,
  getUserById,
  PostUserProfileImage
} from "../../../environment/UserService";
import "../adminuser.css";

export default function ViewUser() {
  const [userData, setUserData] = useState({});
  const [fullName, setFullName] = useState("");
  const [userDataFullname, setUserDataFullname] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [userProfile, setUserProfile] = useState("");

  const [imageBase, setImageBase] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const navigate = useNavigate();

  // let fData = new FormData();
  // const file = new FileReader();

  const paramId = useParams("id");

  const GetUserData = async () => {
    const response = await getUserById(paramId.id);
    let data = response.data;
    setUserData(data);
    const FullName =
      data.firstName + " " + data.middleName + " " + data.lastName;
    setUserDataFullname(FullName);
  };

  const HandleImage = (e) => {
    setImageBase(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const uploadImage = async (image) => {
    const form = new FormData();
    form.append("file", imageBase);
    const url = await PostUserProfileImage(form);
    const urlData = url.data;
    setUserProfile(urlData.fileLink);
  };

  const Submit = async () => {
    const fname = fullName.split(" ");
    if (previewImage !== "") {
      uploadImage(previewImage);
    }
    const userDatafull = {
      firstName: fname[0],
      middleName: fname.length === 3 ? fname[1] : "",
      lastName: fname.length === 3 ? fname[2] : fname[1],
      email: email,
      dob: dob,
      contactNum: contact,
      address: address,
      uprofile: previewImage === "" ? userData.uprofile : userProfile
    };
    console.log("data: ", userDatafull);
    await UpdateUserProfileDataById(paramId.id, JSON.stringify(userDatafull));
  };

  const handleConfirm = () => {
    // Implement your confirmation action here
    DeleteUserById(paramId.id);
    // console.log("id: ", id);
    navigate("/admin/user");
  };

  useEffect(() => {
    GetUserData();
    const timer = setInterval(() => GetUserData(), 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <SideNav />
      <div className="container mt-5">
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary"
            type="button"
            data-mdb-toggle="offcanvas"
            data-mdb-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <i className="fa-solid fa-pen-to-square"></i> Edit
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                Edit User
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-mdb-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <div className="d-flex flex-column">
                <div className="form-group mb-2">
                  <label className="text-muted fw-bold mx-1">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your fullname"
                    value={userData.firstName}
                    onChange={(text) => {
                      setFullName(text.target.value);
                    }}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="text-muted fw-bold mx-1">Middle Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your middle name"
                    value={userData.middleName}
                    onChange={(text) => {
                      setFullName(text.target.value);
                    }}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="text-muted fw-bold mx-1">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your last name"
                    value={userData.lastName}
                    onChange={(text) => {
                      setFullName(text.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label className="text-muted fw-bold mx-1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={userData.email}
                  onChange={(text) => setEmail(text.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label className="text-muted fw-bold mx-1">
                  Date of Birth (DOB)
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={userData.dob}
                  onChange={(text) => setDob(text.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label className="text-muted fw-bold mx-1">
                  Contact Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter your contact number"
                  onChange={(text) => setContact(text.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label className="text-muted fw-bold mx-1">Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Address"
                  value={userData.address}
                  onChange={(text) => setAddress(text.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label className="text-muted fw-bold mx-1">Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Enter your profile image"
                  onChange={(e) => {
                    HandleImage(e);
                  }}
                />
              </div>
              <div className="form-group mb-3 d-flex justify-content-center">
                <input
                  type="submit"
                  className="w-50 btn btn-primary"
                  data-mdb-dismiss="offcanvas"
                  onClick={() => Submit()}
                />
              </div>
            </div>
          </div>
          <button
            type="btn"
            className="btn btn-danger mx-3"
            data-mdb-toggle="modal"
            data-mdb-target="#exampleModal"
          >
            <i className="fas fa-trash"></i> Delete
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  Are you sure you want to delete this user?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-mdb-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-mdb-dismiss="modal"
                    onClick={() => {
                      handleConfirm();
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-sm-4">
            <div className="d-flex justify-content-center">
              <img
                className="rounded-circle viewUserProfile"
                alt="Profile pic"
                src={userData.uprofile}
              />
            </div>
          </div>
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                <div className="fs-5">
                  Name: {userData.firstName} {userData.middleName}{" "}
                  {userData.lastName}
                </div>
                <div className="fs-5">Date of Birth (DoB): {userData.dob}</div>
                <div className="fs-5">Role: {userData.role}</div>
              </div>
            </div>
            <div className="card mt-2">
              <div className="card-body">
                <div className="fs-5">Email: {userData.email}</div>
                <div className="fs-5">Contact: {userData.contactNum}</div>
                <div className="fs-5">Address: {userData.address}</div>
              </div>
            </div>
            <div className="card mt-2">
              <div className="card-body">
                <div className="fs-6 fst-italic text-muted">
                  Since: {userData.registerDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
