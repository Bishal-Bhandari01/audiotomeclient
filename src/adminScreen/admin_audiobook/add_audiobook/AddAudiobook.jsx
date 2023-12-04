import React, { useState } from "react";
import SideNav from "../../theme/SideNav";
import {
  PostAudioBook,
  PostAudioBookImage
} from "../../../environment/AdminService";
import { ToastContainer, toast } from "react-toastify";

function AddAudiobook() {
  const [imageBase, setImageBase] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [status, setStatus] = useState("DRAFT");

  let uploadedData = {
    abookName: title !== "" ? title : "Title",
    abookAuthor: author !== "" ? author : "Author",
    adescription: desc !== "" ? desc : "Description",
    abookImage:
      imageUrl !== ""
        ? imageUrl
        : "https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp",
    status: status,
    aUploadDate: new Date().toISOString().split("T")[0]
  };

  const DraftBadge = () => {
    return <div className="badge fs-6 badge-warning">DRAFT</div>;
  };

  const PublishedBadge = () => {
    return <div className="badge fs-6 badge-success">PUBLISHED</div>;
  };

  const HandleImage = (e) => {
    setImageBase(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const HandleImageApi = async () => {
    const form = new FormData();
    form.append("file", imageBase);
    const url = await PostAudioBookImage(form);
    const urlData = url.data;
    // console.log(url);
    setImageUrl(urlData.fileLink);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Title field cannot be empty");
      return;
    }
    if (desc === "") {
      toast.error("Description field cannot be empty");
      return;
    }
    if (author === "") {
      toast.error("Author field cannot be empty");
      return;
    }
    if (imageBase === "") {
      toast.error("Image field cannot be empty");
      return;
    }
    HandleImageApi();
    const strData = JSON.stringify(uploadedData);
    PostAudioBook(strData);
    window.location.assign("/admin/audiobook");
  };

  return (
    <>
      <SideNav />
      <div
        id="loading-overlay"
        className="modal fade"
        tabindex="-1"
        role="dialog"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="container mt-5 flex-wrap">
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
          <div className="col-sm-7">
            <h3>Add Audiobook</h3>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control form-control-lg"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Author</label>
              <input
                type="text"
                className="form-control form-control-lg"
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Description</label>
              <textarea
                type="text"
                className="form-control form-control-lg"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="form-group mt-3">
              <label>Image</label>
              <input
                type="file"
                accept="image/png"
                className="form-control form-control-lg"
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

              <div className="form-check form-check-inline">
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
            <div className="d-flex justify-content-center mt-3">
              <input
                type="button"
                className="btn btn-primary"
                value="Save"
                onClick={onSubmit}
              />
            </div>
          </div>
          <div className="col-sm-5">
            <h3>Preview</h3>
            <div className="d-flex justify-content-center mt-3">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={`${previewImage}`}
                  alt="Preview"
                  className="card-img-top"
                  height={200}
                />
                <div className="card-body">
                  <h3 className="card-title">{uploadedData.abookName}</h3>
                  <p>{uploadedData.abookAuthor}</p>
                  <p className="text-muted">
                    {uploadedData.adescription.substring(0, 50)}
                    {uploadedData.adescription.length > 50 ? "..." : ""}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-around">
                  {status !== "DRAFT" ? <PublishedBadge /> : <DraftBadge />}
                  <button className="btn">
                    <i className="fa-solid fa-info"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AddAudiobook;
