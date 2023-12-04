import React, { useEffect, useState } from 'react'
import NavBar from '../../theme/Navbar'
import './Home.css'
import { Link } from 'react-router-dom'
import { GetDataFromTheBookMark } from '../../environment/AudiobookService';
import axios from 'axios'

const CONTINUELISTENING = [
  { title: 'Demo', author: 'Demo', desc: 'Hello World.' },
  { title: 'Demo', author: 'Demo', desc: 'Hello World.' },
  { title: 'Demo', author: 'Demo', desc: 'Hello World.' },
  { title: 'Demo', author: 'Demo', desc: 'Hello World.' },
  { title: 'Demo', author: 'Demo', desc: 'Hello World.' },
  { title: 'Demo', author: 'Demo', desc: 'Hello World.' },
]
export default function Home() {
  const [BookMarkData, setBookMarkData] = useState([]);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')))

  const CallBookMarkFromTheApi = async () => {
    return new Promise(function (resolve, reject) {
      axios.post(`http://localhost:8080/api/v1/getSixBookmarkbyuserId?uid=${userData.id}`, {}, {
        headers: {
          common: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authentication",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Referrer-Policy": "no-referrer"
          }
        }
      }).then(resp => resolve(resp))
        .catch(err => reject(err));
    })
  }

  const BookMark = async () => {
    const getDataFromBookMark = await CallBookMarkFromTheApi();
    const responseData = getDataFromBookMark.data;
    const arrayData = responseData.responseDtoList;
    let arrayAudiobook = []
    for (let i = 0; i < arrayData.length; i++) {
      arrayAudiobook.push(arrayData[i].audioBookId);
    }
    const resp = await GetDataFromTheBookMark(arrayAudiobook);
    const respData = resp.data;
    setBookMarkData(respData.response);
  }

  useEffect(() => {
    BookMark()
    const timer = setInterval(() => {
      BookMark()
    }, 15000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <NavBar />
      <main className="container mt-5 mb-5">

        {/* <hr style={{ color: '#BD00FF' }} /> */}
        <div className="mb-4">
          <div className="d-flex justify-content-between">
            <p className="fs-4 fw-bold">Continue Listening</p>
            <Link to="/audiobooks" className="fs-6 fw-bold" style={{ color: '#BD00FF' }}>
              Show more <i className="fa-solid fa-chevron-right"></i>
            </Link>
          </div>
          <div className='d-flex justify-content-center flex-row flex-wrap'>
            {BookMarkData.map((items, index) => {
              return (
                <div
                  key={index}
                  style={{ display: 'flex', marginRight: '20px' }}
                  className='mb-4'
                >
                  <div className="card" style={{ width: '17rem' }}>
                    <img
                      src={
                        items.abookImage == null ?
                          "https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp" :
                          items.abookImage
                      }
                      className="card-img-top"
                      alt="Fissure in Sandstone"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{items.abookName}</h5>
                      <p className="card-text">By {items.abookAuthor}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}
