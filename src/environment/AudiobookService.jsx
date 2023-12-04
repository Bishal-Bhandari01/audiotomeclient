import axios from "axios";

const apiEndPoint = "http://localhost:8080/api/v1";

// export const fileUploadUrl = (data) => {
//     return new Promise((resolve, reject)=>{
//         axios.post(apiendpoint, data, )
//     })
// }

export const getAudiobookByListen = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${apiEndPoint}/audiobook/getAudioBookBasedonListen`,
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
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export function GetAudiobook() {
  return new Promise(function (resolve, reject) {
    axios
      .get(`${apiEndPoint}/audiobook`, {
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
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export function GetAudioBookByStatus(status) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${apiEndPoint}/audiobook/getDataByStatus?status=${status}`,
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
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function DeleteById(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(
        `${apiEndPoint}/audiobook/deleteByid/${id}`,
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
      .catch((err) => reject(err));
  });
}

export function GetAudioBookById(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiEndPoint}/audiobook/getByAId?aId=${id}`, {
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

export function GetAudiobookByDescription(desc) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiEndPoint}/recommand/content-tdidf`, desc, {
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

export function GetDataFromTheBookMark(data) {
  return new Promise((resolve, reject) => {
    axios.post(`${apiEndPoint}/audiobook/getAudiobookByListOfId`, data, {
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
      .then(resp => resolve(resp))
      .catch(err => reject(err));
  });
}
