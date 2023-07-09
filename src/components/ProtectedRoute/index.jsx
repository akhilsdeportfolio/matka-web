/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";

export default function ProtectedRoute() {    
const {user}=useAuth();
const isAuth= user!==null;
  return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
}
