import React,{useState,useEffect} from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useStore from '../store/store';
import { getRole } from '../services/AuthService';


const ProtectedRoute = ({ allowedRoles}) => {
  // const [userRole, setUserRole] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  const {userRole} = useStore();
  // useEffect(() => {
  //   const fetchRole = async () => {
  //     const data = await getRole();
  //     setUserRole(data.role);
  //     setIsLoading(false);
  //   };
  
  //   fetchRole();
  // }, []);
  
  // Check if the user's role is allowed to access the route
  const isAuthorized = allowedRoles.includes(userRole);
  
  // if (isLoading) {
  //   return <div>Loading...</div>; // Replace this with your actual loading component
  // }
  
  return isAuthorized ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
