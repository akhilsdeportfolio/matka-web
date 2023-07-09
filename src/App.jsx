import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/Auth/AuthContext";
import { Suspense, useEffect, useState } from "react";
import { Skeleton } from "antd-mobile";
import Dashboard from "./components/Dashboard";
import './App.css';
import GameDescription from "./components/GameDescription";
import { auth } from "./clientFirebase";

export default function App() {

  const [loading,setIsLoading]=useState(true);


  useEffect(()=>{
  const unsubscribe= auth.onAuthStateChanged(()=>{
      setIsLoading(false);
  });
  return unsubscribe;
  },[])

  


  if(loading)
    return (<div className="p-2 flex flex-col justify-center">            
        <Skeleton.Title active block/>
        <Skeleton.Paragraph lineCount={5} active block/>                
        <Skeleton.Title active block/>
        <Skeleton.Paragraph lineCount={5} active block/>                
        <Skeleton.Title active block/>
        <Skeleton.Paragraph lineCount={5} active block/>                
        
    </div>)

  return (
    <AuthProvider>      
        <Router>
        <Suspense fallback={<Skeleton.Paragraph lineCount={10} />}>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route element={<ProtectedRoute />}>
              <Route exact path="/" element={<Dashboard />}>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/mybets" element={<Login />} />
                <Route exact path="/results" element={<SignUp />} />
                <Route exact path="/profile" element={<Home />} />
                <Route exact path="/charts" element={<Home />} />                
              </Route>
              <Route exact path="/selectDraw" element={<GameDescription type="ank"/>}/>
            </Route>
          </Routes>
          </Suspense>
        </Router>      
    </AuthProvider>
  );
}

