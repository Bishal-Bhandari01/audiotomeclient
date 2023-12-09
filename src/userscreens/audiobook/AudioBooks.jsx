import React, { useEffect, useRef, useState, useContext } from "react";
import NavBar from "../../theme/Navbar";
import "./AudioBook.css";
import { GetAudioBookByStatus } from "../../environment/AudiobookService";
import { useNavigate } from "react-router-dom";
import Player from "../../player/Player";
import Marquee from "react-fast-marquee";


export default function AudioBooks() {
  const [searchedAudio, setSearchedAudio] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState("");

  const [playerData, setPlayerData] = useState("");
  const [audioBookAuthor, setAudioBookAuthor] = useState("");

  const [audioBook, setAudioBook] = useState([]);

  const navigate = useNavigate();

  const audioElm = useRef();

  const TooglePlayPause = (items) => {
    setCurrentSong(items);
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
    // setIsPlaying(!isPlaying)
    if (isPlaying) {
      audioElm.current.play();
    }
    else {
      audioElm.current.pause();
    }
  }, [])

  useEffect(() => {
    getAudioBook();
    const timer = setInterval(() => {
      getAudioBook();
    }, 5000);
    return () => clearInterval(timer);
  }, [])

  return (
    <>
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
                        setIsPlaying(true)
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
      </div >
      <div
        className={
          playerData !== ""
            ? `sticky-bottom w-100 audiobook-background`
            : "d-none"
        }
      >
        <div className="container">
          <Marquee
            speed={30}>
            <h5 className="text-center text-light mb-1 mt-1">
              {playerData} - By {" "}
              <span className="text-decoration-underline">
                {audioBookAuthor}
              </span>
            </h5>
          </Marquee>

          <audio
            className={"d-none"}
            ref={audioElm}
            src={currentSong}
            autoPlay
          />
          <Player
            isplaying={isPlaying}
            setIsplaying={setIsPlaying}
            audioElm={audioElm} />
        </div>
      </div>
    </>
  );
}
