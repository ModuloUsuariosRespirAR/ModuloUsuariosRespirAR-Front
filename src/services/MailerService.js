import axios from "axios";
import { MAILER_URL } from "../utils/util";

const activateUserMail = async (userId) => {
  const result = await axios
    .post(MAILER_URL + "/mailer/send-email/active-user", {
      id: userId,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

const activateUser = async (userId) => {
  const result = await axios
    .post(MAILER_URL + "/keyrock/activate-user", {
      id: userId,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

const recoverPasswordMail = async (email) => {
  const result = await axios
    .post(MAILER_URL + "/mailer/send-email/change-password", {
      email: email,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

const recoverPassword = async (userId, password) => {
  const result = await axios
    .put(MAILER_URL + "/keyrock/change-password", {
      id: userId,
      password: password,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });

  return result;
};

export { activateUserMail, activateUser, recoverPasswordMail, recoverPassword };
