import React, {useState} from 'react';
import './App.css';
import {Login} from "./components/layout/Login/Login";
import {AuthContext} from "./context/AuthContext";
import {Tasks} from "./components/layout/Tasks/Tasks";
import {Route, Routes, Navigate} from "react-router-dom";
import {Admin} from "./components/layout/Admin/Admin";
import {Dashboard} from "./components/layout/Dashboard/Dashboard";
import {Parts} from "./components/layout/Parts/Parts";
import {Orders} from "./components/layout/Orders/Orders";
import {Blank} from "./components/layout/Blank/Blank";
import {User} from "./types/user";

export const App = () => {
  // const [user, setUser] = useState({
  //     userEmail: '',
  //     userType: '',
  //     accessToken: '',
  //     refreshToken: '',
  // });
    const [userEmail, setUserEmail] = useState('');
    const [userType, setUserType] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');

  return (
      <AuthContext.Provider
          value={{userEmail, userType, accessToken, refreshToken, setUserEmail, setUserType, setAccessToken, setRefreshToken}}
      >
          <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/admin" element={<Admin/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/task" element={<Tasks/>}/>
              <Route path="/part" element={<Parts/>}/>
              <Route path="/order" element={<Orders/>}/>
              <Route path="/" element={userEmail && userType && accessToken && refreshToken ? <Navigate to="/task" /> : <Navigate to="/login" />}/>
              <Route path={document.URL.replace('http://localhost:3000', '')} element={<Blank/>}/>
          </Routes>
      </AuthContext.Provider>
  )
};