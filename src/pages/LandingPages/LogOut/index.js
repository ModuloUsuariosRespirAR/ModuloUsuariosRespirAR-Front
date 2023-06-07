import { useAuth } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LogOut() {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logOut();
    navigate("/");
  }, [logOut, navigate]);
}

export default LogOut;
