import React, { useState, useEffect } from "react";
import "./AudiobookDetails.css";
import { GetAudioBookById } from "../../../environment/UserService";
import { GetCommentByaId } from "../../../environment/CommentService";
import InfiniteScroll from "react-infinite-scroll-component";
import { AddBookMark } from "../../../environment/BookMarkService";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../../theme/Navbar'
import { GetAudiobookByDescription } from "../../../environment/AudiobookService";

export default function AudioBookDetail() {

  const [responseData, setResponseData] = useState({});
  const [totalComments, setTotalComments] = useState();
  const [comment, setComments] = useState([]);
  const [recommand, setRecommand] = useState([]);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')))

  const paramId = useParams("id");
  const navigate = useNavigate()

  const GetAudioBookData = async () => {
    await GetAudioBookById(paramId.id).then((resp) => {
      setResponseData(resp.data);
    });
  };
  const fetchData = () => {
    if (comment.length > 50) {
      setTimeout(() => {
        setComments(comment.concat(Array.from({ length: 20 })));
      }, 500);
    }
  };
  const SaveBookMark = async () => {
    const data = {
      userId: userData.id,
      audioBookId: parseInt(paramId.id)
    }
    const resp = await AddBookMark(data);
    if (resp.status === 200) {
      toast.success("Bookmark Added");
      setInterval(() => navigate("/audiobooks"), 5000)
    }
  }

  const GetRecommandation = async () => {
    const data = {
      description: responseData.adescription
    }
    const resp = await GetAudiobookByDescription(data);
    const recommandData = resp.data;
    setRecommand(recommandData);
  };

  const GetCommentByAid = async () => {
    const comResp = await GetCommentByaId(paramId.id);
    const data = comResp.data;
    setTotalComments(data.totalComments);
    setComments(data.comments);
  };

  const countAudiobookListen = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

  useEffect(() => {
    GetAudioBookData();
    GetCommentByAid();
    GetRecommandation();
    const timer = setInterval(() => {
      GetAudioBookData();
      GetCommentByAid();
      GetRecommandation();
    }, 10000)
    return () => clearInterval(timer);
  }, []);
  return (
    <main>
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
      <Navbar />
      <div className="container">
        <div className="card mt-4">
          <div className="card-body">
            <div className="d-flex flex-row">
              <div className="image mx-3">
                <img
                  src={
                    responseData.abookImage === ""
                      ? "https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
                      : responseData.abookImage
                  }
                  alt="Audiobook Image"
                  className="audiobookImage"
                />
              </div>
              <div className="nameList w-100">
                <div className="d-flex flex-row justify-content-between">
                  <div className="fs-3 fw-bold">{responseData.abookName}</div>
                  <button className="btn btn-primary btn-sm" onClick={() => SaveBookMark()}><i className="fa-solid fa-bookmark"></i></button>
                </div>
                <div className="fs-6 fw-bold fst-italic text-muted">
                  By {responseData.abookAuthor}
                </div>
                <div className="badge badge-success">
                  <i className="fa-solid fa-headphones"></i>
                  <span className="ms-2">
                    {countAudiobookListen(responseData.listen)}
                  </span>
                </div>
                <p className="text-muted text-justify small">
                  {responseData.adescription}
                </p>
              </div>
            </div>
            <hr className="my-4"></hr>
            <div className="row">
              <div className="col-sm-7">
                <div className="fs-5">
                  Comments
                  <span className="badge badge-info ms-2">
                    {totalComments}
                  </span>
                </div>
                <div className="input-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Comment Here..."
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <button className="btn btn-primary" type="button" id="button-addon2" data-mdb-ripple-init data-mdb-ripple-color="dark">
                    Submit
                  </button>
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
                            navigation(`/admin/view_audiobook_detail/${1}`);
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
                                <div className="fs-7 fw-bold fst-italic text-light small">
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
    </main>
  );
}
