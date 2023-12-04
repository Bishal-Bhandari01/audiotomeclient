import axios from "axios";

// const apiEndPoint = "https://audiotomeserver-production.up.railway.app/api/v1";
const apiEndPoint = "http://localhost:8080/api/v1";

export function GetUserById(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${apiEndPoint}/user/getUserById?id=${id}`,
        {},
        {
          headers: {
            common: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "Authentication",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Referrer-Policy": "no-referrer",
            },
          },
        }
      )
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const PostAudioBook = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiEndPoint}/audiobook`, data, {
        headers: {
          common: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authentication",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Referrer-Policy": "no-referrer",
          },
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getAudioBookBasedOnTIme = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${apiEndPoint}/audiobook/getAudiobookBasedOnTime`,
        {},
        {
          headers: {
            common: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "Authentication",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Referrer-Policy": "no-referrer",
            },
          },
        }
      )
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const PostAudioBookImage = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiEndPoint}/audiobook/postAudioBookImage`, data, {
        headers: {
          common: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authentication",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Referrer-Policy": "no-referrer",
          },
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
