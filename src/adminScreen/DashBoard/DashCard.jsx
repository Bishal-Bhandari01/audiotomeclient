import React, { useEffect, useState } from "react";
import { getUserBasedOnTime } from "../../environment/UserService";
import { getAudioBookBasedOnTIme } from "../../environment/AdminService";

export default function DashCard() {
  const [userdata, setUserdata] = useState({});
  const [audiobooksdata, setAudiobookdata] = useState({});

  const DashCardData = async () => {
    const testdata = await getUserBasedOnTime();
    setUserdata(testdata.data);
  };

  const DashCardAudiobook = async () => {
    const audiodata = await getAudioBookBasedOnTIme();
    setAudiobookdata(audiodata.data);
  };

  useEffect(() => {
    DashCardData();
    DashCardAudiobook();
    const timer = setInterval(() => {
      DashCardData();
      DashCardAudiobook();
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-2">
      <div className="card" style={{ border: "none" }}>
        <div className="card-body">
          <div className="fs-4 fw-bold">
            <i className="fa fa-users" /> User
          </div>
          <table className="table border-0 mb-0">
            <tbody className="border border-white">
              <tr className="text-center">
                <td className="border-end">
                  <div className="fs-5 fw-bold">{userdata.daily}</div>
                  <div className="fs-5 fw-bold">Today</div>
                </td>
                <td className="border-end">
                  <div className="fs-5 fw-bold">{userdata.weekly}</div>
                  <div className="fs-5 fw-bold">Weekly</div>
                </td>
                <td className="border-end">
                  <div className="fs-5 fw-bold">{userdata.monthly}</div>
                  <div className="fs-5 fw-bold">Monthly</div>
                </td>
                <td className="border-end">
                  <div className="fs-5 fw-bold">{userdata.yearly}</div>
                  <div className="fs-5 fw-bold">Yearly</div>
                </td>
                <td>
                  <div className="fs-5 fw-bold">{userdata.totally}</div>
                  <div className="fs-5 fw-bold">Total</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="card mt-3" style={{ border: "none" }}>
        <div className="card-body">
          <div className="fs-4 fw-bold">
            <i className="fa-brands fa-audible" /> Audiobooks
          </div>
          <table className="table border-0 mb-0">
            <tbody className="border border-white">
              <tr className="text-center">
                <td className="border-end">
                  <div className="fs-5 fw-bold">{audiobooksdata.daily}</div>
                  <div className="fs-5 fw-bold">Today</div>
                </td>
                <td className="border-end">
                  <div className="fs-5 fw-bold">{audiobooksdata.weekly}</div>
                  <div className="fs-5 fw-bold">Weekly</div>
                </td>
                <td className="border-end">
                  <div className="fs-5 fw-bold">{audiobooksdata.monthly}</div>
                  <div className="fs-5 fw-bold">Monthly</div>
                </td>
                <td className="border-end">
                  <div className="fs-5 fw-bold">{audiobooksdata.yearly}</div>
                  <div className="fs-5 fw-bold">Yearly</div>
                </td>
                <td>
                  <div className="fs-5 fw-bold">{audiobooksdata.totally}</div>
                  <div className="fs-5 fw-bold">Total</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
