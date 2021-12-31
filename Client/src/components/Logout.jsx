import React, { useEffect, useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
const Logout = () => {
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const History = useNavigate();

  useEffect(() => {
    logOutUser();
  });
  const logOutUser = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res) {
        dispatch({ type: "USER", payload: false });
        History("/");
        swal("Logout Successfully");
      }
    } catch (error) {
      swal("Something went wrong");
    }
  };

  return <div></div>;
};

export default Logout;
