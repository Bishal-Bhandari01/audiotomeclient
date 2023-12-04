import React from "react";
import second from "../.../../../assets/New Project.png";
import NavBar from "../../theme/Navbar";
import mypic from "../../assets/mypic.jpg";

export default function AboutUs() {
  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <img src={second} alt="About" className="w-25" />
        </div>
        <div className="text-center mt-3" style={{ padding: "0 20%" }}>
          <p className="text-muted text-justify fs-6">
            lorem ipsum dolor sit amet, consectetur adip lorem lorem ipsum dolor
            sit amet, consectetur adip lorem lorem ipsum dolor sit amet,
            consectetur adip lorem lorem ipsum dolor sit amet, consectetur adip
            lorem
          </p>
        </div>
        <div className="mt-4 mb-2 text-center">
          <h4>Project Developer</h4>
        </div>
        <div className="d-flex justify-content-center">
          <div className="card mb-3" style={{ width: "60%" }}>
            <div className="row">
              <div className="col-md-3">
                <div className="p-3">
                  <img
                    src={mypic}
                    alt="Trendy Pants and Shoes"
                    className="img-fluid rounded-circle mt-2"
                  />
                </div>
              </div>
              <div className="col-md-9">
                <div className="card-body">
                  <h4 className="card-title">Bishal Bhandari</h4>
                  <p className="card-text text-muted">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
