import axios from "axios";

const apiEndPoint = "http://localhost:8080/api/v1/recommand";

export function GetRecommandation(desc) {
  return new Promise(function (resolve, reject) {
    axios
      .post(`${apiEndPoint}/content-tdidf`, desc, {
        headers: {
          common: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authentication",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Referrer-Policy": "no-referrer"
          }
        }
      })
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}
