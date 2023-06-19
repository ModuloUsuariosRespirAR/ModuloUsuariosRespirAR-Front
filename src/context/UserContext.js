import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getUsers,
  getUser,
  getUserRoles,
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
    if (!loguedUser.error) {
      setUser(loguedUser);
      setIsAuthenticated(true);
      return loguedUser;
    } else {
      return null;
    }
  };

  const logOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("Token");
    localStorage.removeItem("Access");
    localStorage.removeItem("Roles");
  };

  const createNewUser = async (
    token,
    acessToken,
    displayName,
    username,
    email,
    password
  ) => {
    const createdUser = await createUser(
      token,
      acessToken,
      displayName,
      username,
      email,
      password
    );
    if (createdUser != null) {
      return createdUser;
    } else {
      return null;
    }
  };

  const userDetails = async (token, userId) => {
    const user = await userDetail(token, userId);
    return user;
  };

  const userRoles = async (userId, token) => {
    const userRoles = await getUserRoles(userId, token);

    return userRoles;
  };

  const userModification = async (
    token,
    accessToken,
    userId,
    username,
    enabled
  ) => {
    const user = await userEdit(token, accessToken, userId, username, enabled);
    return user;
  };

  const userDeletation = async (token, accessToken, userId) => {
    const result = await userDelete(token, accessToken, userId);
    return result;
  };

  useEffect(() => {
    let accessToken = localStorage.getItem("Access");
    if (accessToken) {
      getLoguedUser(accessToken)
        .then((user) => {
          setIsAuthenticated(false);
          if (user) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("Token");
            localStorage.removeItem("Access");
            setIsAuthenticated(false);
          }
        })
        .catch(console.error);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userRoles,
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
