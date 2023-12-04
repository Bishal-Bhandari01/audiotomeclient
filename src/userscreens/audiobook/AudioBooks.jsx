import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../theme/Navbar";
import "./AudioBook.css";
import song from "../../assets/quala.mp3";
import { GetAudioBookByStatus } from "../../environment/AudiobookService";
import { useNavigate } from "react-router-dom";

export default function AudioBooks() {
  const [searchedAudio, setSearchedAudio] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState("");

  const [duration, setDuration] = useState(0);

  const [playerData, setPlayerData] = useState("");
  const [audioBookAuthor, setAudioBookAuthor] = useState("");

  const [audioBook, setAudioBook] = useState([]);

  const audioEle = useRef();

  const navigate = useNavigate();

  const TooglePlayPause = (items) => {
    const prevSong = isPlaying;
    setCurrentSong(items);
    setIsPlaying(!prevSong);
    if (prevSong) {
      audioEle.current.play();
    } else {
      audioEle.current.pause();
    }
    setDuration(audioEle.current.duration);
  };

  const Searched = (event) => {
    setSearchedAudio(event.target.value);
  };

  const getAudioBook = async () => {
    const resp = await GetAudioBookByStatus("PUBLISHED");
    const respData = resp.data;
    setAudioBook(respData.response);
  };

  useEffect(() => {
    getAudioBook();
    const timer = setInterval(() => {
      getAudioBook();
    }, 5000);
    return () => clearInterval(timer);
  }, [])

  return (
    <>
      <NavBar />
      <div className="container mt-5 mb-3">
        <div className="d-flex justify-content-end">
          <div className="input-group w-50 mb-3">
            <input
              type="search"
              className="form-control"
              placeholder="Search audio book"
              value={searchedAudio}
              onChange={Searched}
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
            />
          </div>
        </div>
        <div className="d-flex flex-row justify-content-center flex-wrap">
          {audioBook
            .filter((item) => {
              return searchedAudio.toLowerCase() === ""
                ? item
                : item.abookName.toLowerCase().includes(searchedAudio);
            })
            .filter((item) => {
              return item.status === "DRAFT" ? "" : item
            })
            .map((items, index) => {
              return (
                <div
                  className="card mb-3 me-3"
                  style={{ width: "17rem" }}
                  key={index}
                >
                  <div className="d-flex justify-content-center">
                    <img
                      src={items.abookImage == null ? "https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp" : items.abookImage}
                      className="card-img-top w-75 d-flex justify-content-center"
                      loading="lazy"
                      alt="Fissure in Sandstone"
                    />
                  </div>
                  <div className="card-body">
                    <div className="fs-6">{items.abookName}</div>
                    <div className="fs-6 text-decoration-underline">By {items.abookAuthor}</div>
                    <div className="badge badge-success">
                      <i className="fa-solid fa-headphones"></i>
                      <span className="ms-2">{items.listen}</span>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-around">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        TooglePlayPause(items.abookAudio);
                        setPlayerData(items.abookName);
                        setAudioBookAuthor(items.abookAuthor)
                      }}
                    >
                      <i className="fa-solid fa-play"></i>
                    </button>
                    <button
                      className="btn btn-info"
                      onClick={() => navigate(`/audiobooks/detail/${items.aid}`)}
                    >
                      <i className="fa-solid fa-info"></i>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div
        className={
          playerData !== ""
            ? `sticky-bottom w-100 audiobook-background`
            : "d-none"
        }
      >
        <div className="container">
          <h6 className="text-center text-light mb-3">{playerData} - By <span className="text-decoration-underline">{audioBookAuthor}</span></h6>
          <audio
            className={playerData !== "" ? `sticky-bottom w-100` : "d-none"}
            controls
            autoPlay
            ref={audioEle}
            src={currentSong}
            type="audio/mp3"
          />
        </div>
      </div>
    </>
  );
}
