import React, { useEffect, useState } from "react";
import NavBar from "../../theme/Navbar";
import DefaultUser from "../../assets/defaultuser.png";
import {
  GetUserDataById,
  UpdateUserProfileDataById,
  UploadUserProfile,
  UpdateUserContactDataById
} from "../../environment/UserService";
import "./Profile.css";

export default function Profile() {
  const [response, setResponse] = useState([]);
  const [editedResponse, setEditedResponse] = useState({
    fileName: undefined,
    files: undefined
  });
  const [profileImage, setProfileImage] = useState("");

  let fData = new FormData();
  const file = new FileReader();
  let user;

  const setFirstName = (e) => {
    setEditedResponse((eData) => ({
      ...eData,
      firstName: e.target.value
    }));
  };

  const setMiddleName = (e) => {
    setEditedResponse((eData) => ({
      ...eData,
      middleName: e.target.value
    }));
  };
  const setLastName = (e) => {
    setEditedResponse((eData) => ({
      ...eData,
      lastName: e.target.value
    }));
  };
  const setDob = (e) => {
    setEditedResponse((eData) => ({
      ...eData,
      dob: e.target.value
    }));
  };
  const setAddress = (e) => {
    setEditedResponse((eData) => ({
      ...eData,
      address: e.target.value
    }));
  };

  // const uploadFile = () => {
  //   user = UploadUserProfile(fData);
  //   setEditedResponse({
  //     uProfile: user
  //   });
  // };

  const Submit = () => {
    setEditedResponse({
      uprofile: profileImage.files
    })
    UpdateUserProfileDataById(
      localStorage.getItem("UserId"),
      editedResponse
    ).then((res) => res.data);
  };

  // Contact section
  const [updatedContactData, setUpdatedContactData] = useState({
    contactNum: "",
    email: ""
  });

  const setContactNum = (e) => {
    setUpdatedContactData((eData) => ({
      ...eData,
      address: e.target.value
    }));
  };
  const setEmail = (e) => {
    setUpdatedContactData((eData) => ({
      ...eData,
      address: e.target.value
    }));
  };

  const onSubmitContact = () => {
    UpdateUserContactDataById(
      localStorage.getItem("UserId"),
      updatedContactData
    );
  };

  useEffect(() => {
    GetUserDataById(localStorage.getItem("UserId")).then((response) => {
      setResponse(response.data);
      setEditedResponse(response.data);
    });
  }, []);

  const DeleteAccount = () => {};

  function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  return (
    <>
      <NavBar />
      <main className="container mt-5">
        <div className="row">
          <div className="col-sm-4">
            <div
              className="card border-0"
              style={{ border: "3px solid #BD00FF" }}
            >
              <div className="card-body">
                <div className="d-flex flex-wrap justify-content-center">
                  <img
                    src={
                      response.uProfile == null
                        ? DefaultUser
                        : response.uProfile
                    }
                    alt="My profile"
                    className="w-75"
                    loading="lazy"
                    style={{ border: "6px solid #BD00FF", borderRadius: "50%" }}
                  />
                </div>
                <div className="text-center mt-3 mb-1">
                  <h3 className="fw-bold mb-0">
                    {response.firstName}{" "}
                    {response.middleName == null ? null : response.middleName}{" "}
                    {response.lastName}
                  </h3>
                </div>
                <div className="text-center">
                  <h5 className="my-3">
                    {calculate_age(new Date(response.dob))} yrs old
                  </h5>
                  <h5 className="my-3">
                    {response.address == null ? null : response.address}
                  </h5>
                </div>
                <div className="mt-3 d-flex justify-content-around">
                  <button
                    className="btn btn-lg btn-info"
                    data-mdb-toggle="modal"
                    data-mdb-target="#exampleModal"
                    type="button"
                  >
                    <i className="fa-solid fa-edit"></i>
                  </button>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Edit Profile
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-mdb-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div className="row">
                            <div className="col">
                              <div className="form-group">
                                <label
                                  className="form-label"
                                  for="form1Example1"
                                >
                                  First Name
                                </label>
                                <input
                                  type="text"
                                  id="form1Example1"
                                  value={editedResponse.firstName}
                                  onChange={setFirstName}
                                  className="form-control form-control-lg userSettingFormControl"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-group">
                                <label
                                  className="form-label"
                                  for="form1Example1"
                                >
                                  Middle Name
                                </label>
                                <input
                                  type="text"
                                  id="form1Example1"
                                  className="form-control form-control-lg userSettingFormControl"
                                  value={
                                    editedResponse.middleName === ""
                                      ? ""
                                      : editedResponse.middleName
                                  }
                                  onChange={setMiddleName}
                                />
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-group">
                                <label
                                  className="form-label"
                                  for="form1Example1"
                                >
                                  Last Name
                                </label>
                                <input
                                  type="email"
                                  id="form1Example1"
                                  className="form-control form-control-lg userSettingFormControl"
                                  value={editedResponse.lastName}
                                  onChange={setLastName}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group mt-2">
                            <label className="form-label" for="form1Example1">
                              Date of birth
                            </label>
                            <input
                              type="date"
                              id="form1Example1"
                              className="form-control form-control-lg userSettingFormControl"
                              value={
                                editedResponse.dob === "" ? "" : response.dob
                              }
                              onChange={setDob}
                              required
                            />
                          </div>
                          <div className="form-group mt-2">
                            <label className="form-label" for="form1Example1">
                              Address
                            </label>
                            <input
                              type="text"
                              id="form1Example1"
                              className="form-control form-control-lg userSettingFormControl"
                              value={
                                editedResponse.address === ""
                                  ? ""
                                  : editedResponse.address
                              }
                              onChange={setAddress}
                              required
                            />
                          </div>
                          <div className="form-group mt-2">
                            <label className="form-label" for="form1Example1">
                              Profile Image
                            </label>
                            <input
                              type="file"
                              id="form1Example1"
                              accept="image/*"
                              className="form-control form-control-lg userSettingFormControl"
                              value={
                                profileImage.fileName === undefined
                                  ? undefined
                                  : profileImage.fileName
                              }
                              onChange={(e) => {
                                const file = e.target.files[0];
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                  setProfileImage({
                                    filename: e.target.value,
                                    files: reader.result
                                  });
                                };
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-mdb-dismiss="modal"
                            onClick={Submit}
                          >
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="container">
              <div
                className="card my-3"
                style={{ border: "3px solid #BD00FF" }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-10">
                      <h3>Contact Details</h3>
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-phone fs-5"></i>
                        <div className="mx-2 fs-5">9864958063</div>
                      </div>
                      <div className="d-flex flex-wrap align-items-center fs-5 mt-2">
                        <i className="fa-solid fa-envelope"></i>
                        <div className="mx-2">bishalbhandari390@gmail.com</div>
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <button
                        className="btn btn-lg btn-info"
                        data-mdb-toggle="modal"
                        data-mdb-target="#exampleModal1"
                        type="button"
                      >
                        <i className="fa-solid fa-edit"></i>
                      </button>
                      <div
                        className="modal fade"
                        id="exampleModal1"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Edit Profile
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-mdb-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="form-group">
                                <label
                                  className="form-label"
                                  for="form1Example1"
                                >
                                  Phone/Contact Number
                                </label>
                                <input
                                  type="tel"
                                  id="form1Example1"
                                  className="form-control form-control-lg userSettingFormControl"
                                  value={editedResponse.contactNum}
                                  onChange={setContactNum}
                                  required
                                />
                              </div>
                              <div className="form-group mt-2">
                                <label
                                  className="form-label"
                                  for="form1Example1"
                                >
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  id="form1Example1"
                                  className="form-control form-control-lg userSettingFormControl"
                                  value={editedResponse.email}
                                  onChange={setEmail}
                                  required
                                />
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-primary"
                                data-mdb-dismiss="modal"
                                onClick={onSubmitContact}
                              >
                                Save changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="card my-3"
                style={{ border: "3px solid #BD00FF" }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-9">
                      <h3>Delete Account</h3>
                      <p className="text-muted">
                        Delete your personal data and information from this
                        site.
                      </p>
                    </div>
                    <div className="col-sm-3 d-flex flex-wrap flex-column align-items-center justify-content-center">
                      <button
                        type="btn"
                        className="btn btn-info btn-lg mb-3 w-100"
                        // onClick={DeleteAccount}
                      >
                        <i className="fa-solid fa-download"></i> Download
                      </button>
                      <button
                        type="btn"
                        className="btn btn-danger w-100 btn-lg"
                        onClick={DeleteAccount}
                      >
                        <i className="fa-solid fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
