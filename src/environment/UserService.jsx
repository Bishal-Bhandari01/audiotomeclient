import axios from "axios";

// const apiEndPoint = "https://audiotomeserver-production.up.railway.app/api/v1";
const apiEndPoint = "http://localhost:8080/api/v1";

// const apiEndPoint = "https://audio-to-me-server-bishal-bhandari-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/api/v1";

export let Data = [];
// let retrivedData;

export const PostUserData = async (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiEndPoint}/user/saveUser`, data, {
        headers: {
          common: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        }
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const GetUser = () => {
  return new Promise(function (resolve, reject) {
    axios
      .get(`${apiEndPoint}/user/getUser`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export async function Registration(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiEndPoint}/auth/register`, data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}
export async function LoginUser(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiEndPoint}/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

// export async function GetUserDataByEmail(email) {
//   return new Promise(function(resolve, reject) {
//     axios
//       .get(`${apiEndPoint}/user/getUserByEmail?email=${email}`, {
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//           "Authorization": `Bearer ${sessionStorage.getItem("token")}`
//         }
//       })
//       .then(response => {
//         resolve(response);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// }

export async function GetUserDataByEmail(email) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiEndPoint}/user/getUserByEmail?email=${email}`, {
        headers: {
          common: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Headers": "Authorization",
            "Access-Control-Allow-Origin": "*"
          }
        }
      })
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

export function GetUserDataById(data) {
  return new Promise(function (resolve, reject) {
    axios
      .get(apiEndPoint + `/user/getUserById?id=${data}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
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

export function UploadUserProfile(data) {
  axios
    .post(apiEndPoint + "/user/image", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then((res) => {
      return res.data;
    });
}

export function UpdateUserProfileDataById(id, data) {
  return new Promise(function (reject) {
    axios
      .put(`${apiEndPoint}/user/updateGeneralProfile?id=${id}`, data, {
        headers: {
          common: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authentication",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function UpdateUserContactDataById(id, data) {
  return new Promise(function (reject) {
    axios
      .put(apiEndPoint + `/user/updateGeneralContact?id=${id}`, data, {
        headers: {
          common: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authentication",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function GetAudioBook() {
  return await new Promise((resolve, reject) => {
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
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => reject(err));
  });
}
export async function GetAudioBookByName(data) {
  return await new Promise((resolve, reject) => {
    axios
      .get(`${apiEndPoint}/audiobook/SearchByName/${data}`, {
        header: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => reject(err));
  });
}
export async function GetAudioBookById(id) {
  return await new Promise((resolve, reject) => {
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
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => reject(err));
  });
}

export async function getUserBasedOnTime() {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${apiEndPoint}/user/getUserBasedOnTime?role=USER`,
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
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getUserById(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiEndPoint}/user/getUserById?id=${id}`, {
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
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export async function DeleteUserById(id) {
  await axios.delete(`${apiEndPoint}/user/deleteById?id=${id}`, {
    headers: {
      common: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authentication",
        "Content-Type": "application/json",
        "Referrer-Policy": "no-referrer"
      }
    }
  });
}

export async function PostUserProfileImage(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiEndPoint}/user/profileUpdate`, data, {
        headers: {
          common: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authentication",
            "Content-Type": "multipart/form-data",
            "Referrer-Policy": "no-referrer"
          }
        }
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const ForgotPassword = (email) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiEndPoint}/auth/resetPassword?email=${email}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};
