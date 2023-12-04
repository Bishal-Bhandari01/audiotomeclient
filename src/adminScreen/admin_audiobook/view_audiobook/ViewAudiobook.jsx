import React, { useEffect, useState } from "react";
import SideNav from "../../theme/SideNav";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewAudiobook.css";
import { GetAudioBookById } from "../../../environment/AudiobookService";
import { GetCommentByaId } from "../../../environment/CommentService";
import InfiniteScroll from "react-infinite-scroll-component";
import { GetRecommandation } from "../../../environment/RecommandationService"

export default function ViewAudiobook() {
  const navigation = useNavigate();

  const [audiobookId, setAudiobookId] = useState({});

  const [totalComments, setTotalComments] = useState();
  const [comment, setComments] = useState([]);
  const [recommand, setRecommand] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // let fData = new FormData();
  // const file = new FileReader();

  const paramId = useParams("id");

  const Submit = async () => {
    // const savingFile = profileImage.files;
    // console.log("photo: ", savingFile);
  };

  const countAudiobookListen = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

  const handleConfirm = (id) => {
    // Implement your confirmation action here
    // DeleteUserById(id)
    console.log("id: ", id);
    // if (showPopconfirm === true) window.location.assign("/admin/users");
  };

  const fetchData = () => {
    setTimeout(() => {
      setComments(comment.concat(Array.fromArray({ length: 20 })));
    }, 500);
  };

  const getRecommandation = async (desc) => {
    const resp = await GetRecommandation(desc);
    const recommandData = resp.data;
    setRecommand(recommandData);
  };

  const GetCommentByAid = async () => {
    const comResp = await GetCommentByaId(paramId.id);
    const data = comResp.data;
    setTotalComments(data.totalComments);
    setComments(data.comments);
  };

  const GetudiobookDataById = async () => {
    const resp = await GetAudioBookById(paramId.id);
    const respData = resp.data
    setAudiobookId(respData);
    getRecommandation(respData.adescription)
  };

  useEffect(() => {
    GetudiobookDataById();
    GetCommentByAid();
    const timer = setInterval(() => {
      GetudiobookDataById();
      GetCommentByAid();
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // File uploadCode:
  // onChange={(e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     setProfileImage({
  //       filename: e.target.value,
  //       files: reader.result,
  //     });
  //   };
  // }}

  return (
    <>
      <SideNav />
      <div className="container mt-5">
        <div className="d-flex justify-content-end mb-3">
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
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your fullname"
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group mb-3">
                <input type="date" className="form-control" />
              </div>
              <div className="form-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter your contact number"
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Address"
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="file"
                  className="form-control"
                  placeholder="Enter your profile image"
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
                  <button type="button" className="btn btn-danger">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-row">
              <div className="image mx-3">
                <img
                  src={
                    audiobookId.abookImage === ""
                      ? "https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
                      : audiobookId.abookImage
                  }
                  alt="Audiobook Image"
                  className="audiobookImage"
                />
              </div>
              <div className="nameList">
                <div className="fs-3 fw-bold">{audiobookId.abookName}</div>
                <div className="fs-6 fw-bold fst-italic text-muted">
                  By {audiobookId.abookAuthor}
                </div>
                <div className="badge badge-success">
                  <i className="fa-solid fa-headphones"></i>
                  <span className="ms-2">
                    {countAudiobookListen(audiobookId.listen)}
                  </span>
                </div>
                <p className="text-muted text-justify small">
                  {audiobookId.adescription}
                </p>
              </div>
            </div>
            <hr className="my-4"></hr>
            <div className="row">
              <div className="col-sm-7">
                <div className="d-flex flex-wrap justify-content-between mb-2">
                  <div className="fs-5">
                    Comments
                    <span className="badge badge-info ms-2">
                      {totalComments}
                    </span>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary btn-sm"
                      data-mdb-toggle="modal"
                      data-mdb-target="#exampleModal2"
                    >
                      <i className="fa-solid fa-comment-medical"></i>
                    </button>
                    <div
                      className="modal fade"
                      id="exampleModal2"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">Add Comment</div>
                          <div className="modal-body">
                            <div className="form-group">
                              <textarea
                                className="form-control"
                                id="textAreaExample"
                                rows="4"
                              ></textarea>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-mdb-dismiss="modal"
                            >
                              Close
                            </button>
                            <button type="button" className="btn btn-primary">
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <InfiniteScroll
                    dataLength={comment.length}
                    loader={<p>Loading...</p>}
                    next={fetchData}
                    hasMore={comment.length !== totalComments}
                  >
                    {comment.map((item, index) => {
                      return (
                        <div className="card mt-2 overflow-hidden" key={index}>
                          <div className="card-body">
                            <div className="row overflow-hidden">
                              <div className="col-sm-2 d-flex align-items-center justify-content-center">
                                <img
                                  className="comment-image"
                                  src={
                                    item.userImage === ""
                                      ? "https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
                                      : item.userImage
                                  }
                                  alt="Audiobook Image"
                                />
                              </div>
                              <div className="col-sm-8">
                                <div className="fs-5 fw-bold">
                                  {item.userName}
                                </div>
                                <div className="text-muted text-justify">
                                  {item.commentContent}
                                </div>
                              </div>
                              <div className="col-sm-2">
                                <div className="top mt-1 d-flex flex-column text-center flex-wrap">
                                  <div className="liked">
                                    <i className="fa-regular fa-thumbs-up"></i>
                                    <span className="badge badge-success ms-2">
                                      111
                                    </span>
                                  </div>
                                  <hr></hr>
                                  <div className="diliked">
                                    <i className="fa-regular fa-thumbs-down"></i>
                                    <span className="badge badge-danger ms-2">
                                      20
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </InfiniteScroll>
                </div>
              </div>
              <div className="col-sm-5 d-flex align-item-start">
                <div className="card recommandbackground w-100">
                  <div className="card-body">
                    <div className="text-center fs-5 text-decoration-underline fw-bold mb-2">
                      Recommanded Audiobooks
                    </div>
                    {recommand.map((item, index) => {
                      return (
                        <div
                          className="card recommandaudio"
                          key={index}
                          onClick={() => {
                            window.location.assign(`/admin/audiobook_detail/${item.aid}`);
                          }}
                        >
                          <div className="card-body">
                            <div className="d-flex flex-row">
                              <img
                                src={
                                  item.abookImage === ""
                                    ? "https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
                                    : item.abookImage
                                }
                                alt="Audiobook Image"
                                className="recommandaudiobook"
                              />
                              <div className="nameList mx-1">
                                <div className="fs-6 fw-bold">
                                  {item.abookName}
                                </div>
                                <div className="fs-7 fw-bold fst-italic text-light small text-decoration-underline">
                                  By {item.abookAuthor}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
