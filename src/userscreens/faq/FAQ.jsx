import React, { useState } from "react";
import NavBar from "../../theme/Navbar";

export default function FAQ() {
  const [faq, setFaq] = useState([
    {
      question: "Lorem",
      answer:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum LoreF",
      open: false
    },
    {
      question: "Lorem",
      answer:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum LoreF",
      open: false
    },
    {
      question: "Lorem",
      answer:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum LoreF",
      open: false
    },
    {
      question: "Lorem",
      answer:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum LoreF",
      open: false
    }
  ]);

  const ToogleFaq = (index) => {
    setFaq(faq.map((item,i) => {
      if(i === index){
        item.open = !item.open;
      }
      else{
        item.open = false;
      }
      return item;
    }))
  }

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <p className="fs-4 fw-bold mb-2">FAQ</p>
        {faq.map((items, index) => {
          return (
            <div className="card" key={index}>
              <div className="card-header shadow">
                <div className="row">
                  <div className="col-sm-11">
                    <p className="fs-3">{items.question}</p>
                  </div>
                  <div className="col-sm-1 d-flex align-items-start mt-2">
                    <button
                      type="btn"
                      className="btn"
                      onClick={() => {
                        // setFaq((items.open = !items.open));
                        ToogleFaq(index)
                      }}
                    >
                      <i className="fa-solid fa-angle-down"></i>
                    </button>
                  </div>
                  <div
                    className={
                      items.open === false ? "d-none" : "text-muted fs-6"
                    }
                  >
                    {items.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
