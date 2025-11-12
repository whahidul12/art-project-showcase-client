import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";

const PrivetRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();
  // console.log(location);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (user && user.email) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/auth/login"} />;
};

export default PrivetRoutes;
