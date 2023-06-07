import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getUsers,
  getUser,
  createUser,
  userDetail,
  userEdit,
  userDelete,
  getLoguedUser,
} from "../services/UserService";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getUsersList = async (token) => {
    const result = await getUsers(token);
    return result;
  };

  const loginUsuario = async (username, password) => {
    const loguedUser = await getUser(username, password);
    if (loguedUser !== null) {
      setUser(loguedUser);
      setIsAuthenticated(true);
    } else {
      return null;
    }
  };

  const logOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("Token");
    localStorage.removeItem("Access");
  };

  const createNewUser = async (
    token,
    displayName,
    username,
    email,
    password
  ) => {
    const createdUser = await createUser(
      token,
      displayName,
      username,
      email,
      password
    );
    if (createdUser != null) {
      console.log("Usuario creado", createdUser);
    } else {
      return null;
    }
  };

  const userDetails = async (token, userId) => {
    const user = await userDetail(token, userId);
    return user;
  };

  const userModification = async (token, userId, username) => {
    const user = await userEdit(token, userId, username);
    return user;
  };

  const userDeletation = async (token, userId) => {
    const result = await userDelete(token, userId);
    return result;
  };

  useEffect(() => {
    console.count("Retrieve");
    let accessToken = localStorage.getItem("Access");
    getLoguedUser(accessToken)
      .then((user) => {
        if (user) {
          setIsAuthenticated(true);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        loginUsuario,
        logOut,
        getUsersList,
        createNewUser,
        userDetails,
        userModification,
        userDeletation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);

export default UserContext;
