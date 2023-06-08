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

const createRol = async (token, rolname) => {
  const result = await axios
    .post(
      HOST_URL + "/roles/create",
      {
        rolName: rolname,
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

const editRol = async (token, rolId, rolName) => {
  const result = await axios
    .put(
      HOST_URL + "/roles/update/" + rolId,
      {
        rolName: rolName,
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

const deleteRol = async (token, rolId) => {
  const result = await axios
    .delete(HOST_URL + "/roles/delete/" + rolId, {
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

const assignRol = async (token, userId, rolId) => {
  const result = await axios
    .put(
      HOST_URL + "/roles/assign",
      { rolId: rolId, userId: userId },
      {
        headers: {
          "X-Auth-token": token,
          "Content-Type": "application/json",
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

export { getRoles, createRol, editRol, deleteRol, assignRol };
