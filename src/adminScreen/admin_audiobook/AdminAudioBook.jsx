import React, { useEffect, useState } from "react";
import SideNav from "../theme/SideNav";
import { GetAudiobook } from "../../environment/AudiobookService";
import { useNavigate } from "react-router-dom";

function AdminAudioBook() {
  const [checkStatus, setCheckStatus] = useState("");
  const [search, setSearch] = useState("");
  const [respData, setRespData] = useState([]);
  const navigate = useNavigate();

  const DraftBadge = () => {
    return <div className="badge fs-6 badge-warning">DRAFT</div>;
  };

  const PublishedBadge = () => {
    return <div className="badge fs-6 badge-success">PUBLISHED</div>;
  };

  const ClickedStatusData = (e) => {
    setCheckStatus(e.target.value);
    // console.log(checkStatus);
  };

  const GetAllData = async () => {
    const response = await GetAudiobook().then((resp) => {
      return resp.data.response;
    });
    setRespData(response);
  };

  useEffect(() => {
    GetAllData();
    const timer = setInterval(() => {
      GetAllData();
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <SideNav />
      <main className="container mt-5">
        <div className="row">
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search Here..."
              onChange={(text) => setSearch(text.target.value)}
            />
          </div>
          <div className="col-sm-6">
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  window.location.assign("/admin/audiobook/add-details");
                }}
              >
                Add Audiobook
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-center mt-4">
          {respData
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(search);
            })
            .map((i, index) => {
              return (
                <div
                  className="card me-5 my-3"
                  style={{ width: "16rem" }}
                  key={index}
                  loading="lazy"
                >
                  <div className="d-flex justify-content-center">
                    <img
                      src={i.abookImage}
                      className="card-img-top w-75"
                      alt="Fissure in Sandstone"
                    />
                  </div>
                  <div className="card-body">
                    <h6 className="card-title">{i.abookName}</h6>
                    <h6 className="text-muted text-decoration-underline">By {i.abookAuthor}</h6>
                  </div>
                  <div className="card-footer d-flex justify-content-around">
                    {i.status === "DRAFT" ? <DraftBadge /> : <PublishedBadge />}
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        navigate(`/admin/audiobook_detail/${i.aid}`);
                      }}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    </>
  );
}

export default AdminAudioBook;
