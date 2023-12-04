import axios from "axios";

const apiEndPoint = "http://localhost:8080";

export function GetCommentByaId(id) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${apiEndPoint}/countcommentsbyaid?aid=${id}`,
        {},
        {
          headers: {
            common: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "Authentication",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Referrer-Policy": "no-referrer"
            }
          }
        }
      )
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}
