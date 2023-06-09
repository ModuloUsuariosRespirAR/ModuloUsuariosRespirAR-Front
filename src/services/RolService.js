import axios from "axios";
import { HOST_URL } from "../utils/util";

const getRoles = async (token) => {
  const result = await axios
    .get(HOST_URL + "/roles/list", {
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

const getRol = async (rolId, token) => {
  const result = await axios
    .get(HOST_URL + "/roles/role/" + rolId, {
      headers: {
        "X-Auth-token": token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            statusCode: error.response.status,
            message: error.response.message,
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

const createRol = async (token, accessToken, rolname) => {
  const result = await axios
    .post(
      HOST_URL + "/roles/create",
      {
        rolName: rolname,
      },
      {
        headers: { "X-Auth-token": token, accesstoken: accessToken },
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

const editRol = async (token, accessToken, rolId, rolName) => {
  const result = await axios
    .put(
      HOST_URL + "/roles/update/" + rolId,
      {
        rolName: rolName,
      },
      {
        headers: { "X-Auth-token": token, accesstoken: accessToken },
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

const detailRol = async (rolId, token) => {
  const result = await axios
    .get(HOST_URL + "/roles/role/" + rolId, {
      headers: {
        "X-Auth-token": token,
      },
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

const deleteRol = async (token, accessToken, rolId) => {
  const result = await axios
    .delete(HOST_URL + "/roles/delete/" + rolId, {
      headers: { "X-Auth-token": token, accesstoken: accessToken },
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

const assignRol = async (token, accessToken, userId, rolId) => {
  const result = await axios
    .put(
      HOST_URL + "/roles/assign",
      { rolId: rolId, userId: userId },
      {
        headers: {
          "X-Auth-token": token,
          "Content-Type": "application/json",
          accessToken: accessToken,
        },
      }
    )
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

export {
  getRoles,
  getRol,
  createRol,
  editRol,
  detailRol,
  deleteRol,
  assignRol,
};
