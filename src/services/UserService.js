import axios from "axios";
import { HOST_URL } from "../utils/util";

const getUsers = async (token) => {
  const result = await axios
    .get(HOST_URL + "/users/list", {
      headers: { "X-Auth-token": token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            statusCode: error.response.status,
            message: error.response.data,
          },
        };
      } else {
        return {
          error: {
            statusCode: 500,
            message: "Keyrock connection failed",
          },
        };
      }
    });
  return result;
};

const getUser = async (username, password) => {
  const result = await axios
    .post(
      HOST_URL + "/login",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      localStorage.setItem("Token", res.data["X-Auth-token"]);
      localStorage.setItem("Access", res.data["accessToken"]);
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            statusCode: error.response.status,
            message: error.response.data,
          },
        };
      } else {
        return {
          error: {
            statusCode: 500,
            message: "Keyrock connection failed",
          },
        };
      }
    });
  if (result.access_token) {
    return result.access_token;
  } else {
    return result;
  }
};

const createUser = async (token, displayName, username, email, password) => {
  const user = {
    displayName: displayName,
    username: username,
    email: email,
    password: password,
  };
  const result = await axios
    .post(
      HOST_URL + "/users/create",
      {
        user,
      },
      {
        headers: { "X-Auth-token": token },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            statusCode: error.response.status,
            message: error.response.data,
          },
        };
      } else {
        return {
          error: {
            statusCode: 500,
            message: "Keyrock connection failed",
          },
        };
      }
    });
  if (result.access_token) {
    return result.access_token;
  } else {
    return result;
  }
};

const userDetail = async (token, userId) => {
  const result = await axios
    .get(HOST_URL + "/users/user/" + userId, {
      headers: { "X-Auth-token": token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            statusCode: error.response.status,
            message: error.response.data.error.message,
          },
        };
      } else {
        return {
          error: {
            statusCode: 500,
            message: "Keyrock connection failed",
          },
        };
      }
    });
  return result;
};

const userEdit = async (token, userId, username) => {
  const user = {
    username: username,
  };
  const result = await axios
    .put(
      HOST_URL + "/users/update/" + userId,
      {
        user,
      },
      {
        headers: { "X-Auth-token": token },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            statusCode: error.response.status,
            message: error.response.data,
          },
        };
      } else {
        return {
          error: {
            statusCode: 500,
            message: "Keyrock connection failed",
          },
        };
      }
    });
  if (result.access_token) {
    return result.access_token;
  } else {
    return result;
  }
};

const userDelete = async (token, userId) => {
  const result = await axios
    .delete(HOST_URL + "/users/delete/" + userId, {
      headers: { "X-Auth-token": token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            statusCode: error.response.status,
            message: error.response.data,
          },
        };
      } else {
        return {
          error: {
            statusCode: 500,
            message: "Keyrock connection failed",
          },
        };
      }
    });
  if (result.access_token) {
    return result.access_token;
  } else {
    return result;
  }
};

const getLoguedUser = async (accessToken) => {
  const user = await axios
    .post(HOST_URL + "/login/retrieve", {
      accessToken,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });

  return user;
};
export {
  getUsers,
  getUser,
  createUser,
  userDetail,
  userEdit,
  userDelete,
  getLoguedUser,
};
