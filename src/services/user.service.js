import * as server from "./server.constants";
import authHeader from "./auth.service";
import { handleResponse } from "./reusable.functions";

const login = (login, password) => {
  const rawData = JSON.stringify({ login, password });
  const requestOptions = {
    method: "POST",
    body: rawData,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(`${server.API_URL}/user/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store jwt (login, token) in local storage
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    })
    .catch((error) => console.log("frontend error", error));
};

const logout = () => {
  // remove user token from local storage to log out
  localStorage.removeItem("user");
};

const register = (newUser) => {
  const rawData = JSON.stringify(newUser);
  const requestOptions = {
    method: "POST",
    body: rawData,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(`${server.API_URL}/user/register`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("frontend error", error));
};

const getUserData = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${server.API_URL}/user/authorized`, requestOptions)
    .then(handleResponse)
    .then((userData) => {
      return userData[0];
    })
    .catch((error) => console.log("frontend error", error));
};

const updateUserData = (user) => {
  const rawData = JSON.stringify(user);
  const multiHeader = new Headers(authHeader());
  multiHeader.append("Content-Type", "application/json");

  const requestOptions = {
    method: "PATCH",
    body: rawData,
    headers: multiHeader,
  };
  return fetch(`${server.API_URL}/user/authorized`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("frontend error", error));
};

const getUserOrders = (userId) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${server.API_URL}/orders/${userId}`, requestOptions)
    .then(handleResponse)
    .then((orders) => {
      return orders;
    })
    .catch((error) => {
      console.log("frontend error", error);
    });
};

const getOrderDetails = (orderId) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${server.API_URL}/orders/details/${orderId}`, requestOptions)
    .then(handleResponse)
    .then((orderDetails) => {
      return orderDetails;
    })
    .catch((error) => console.log("frontend error", error));
};

const auth = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${server.API_URL}/user/auth`, requestOptions)
    .then((response) => {
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => console.log("frontend error", error));
};
// WHICH BETTER?:
// const auth = async () => {
//   const requestOptions = {
//     method: "GET",
//     headers: authHeader(),
//   };
//   try {
//     const response = await fetch(`${server.API_URL}/user/auth`, requestOptions);
//     if (response.ok) {
//       return true;
//     }
//     else {
//       return false;
//     }
//   }
//   catch (error) {
//     return console.log("frontend error", error);
//   }
// };

export const userService = {
  login,
  logout,
  register,
  getUserData,
  getUserOrders,
  getOrderDetails,
  updateUserData,
  auth,
};
