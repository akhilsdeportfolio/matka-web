import { Route, BrowserRouter as Router, Routes, createRoutesFromChildren, matchRoutes, useLocation, useNavigationType, } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/Auth/AuthContext";
import React, { Suspense, useEffect, useState } from "react";
import { DotLoading, Skeleton } from "antd-mobile";
import Dashboard from "./components/Dashboard";
import "./App.css";
import { auth } from "./clientFirebase";
import SelectDrawList from "./components/SelectDrawList";
import BetAccepted from "./components/BetAccepted";
import MyBets from "./components/MyBets";
import Results from "./components/Results";
import Profile from "./components/Profile";
import * as Sentry from "@sentry/react";
import Deposit from "./components/Deposit";

export default function App() {
  const [loading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);




  Sentry.init({
    dsn: "https://04f12a79dc20460aa1cd7cbc4a63f23b@o4505509460639744.ingest.sentry.io/4505509474336768",
    integrations: [
      new Sentry.BrowserTracing({
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ["localhost", "https:yourserver.io/api/"],
      }),
      
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });

  if (loading)
    return (
      <div className="p-2 flex flex-col">
        <div className="text-center"><DotLoading /><span>Loading ... </span>
</div>
        <Skeleton.Title active block />
        <Skeleton.Paragraph lineCount={5} active block />
        <Skeleton.Title active block />
        <Skeleton.Paragraph lineCount={5} active block />
        <Skeleton.Title active block />
        <Skeleton.Paragraph lineCount={5} active block />
      </div>
    );

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
                  <Route exact path="/mybets" element={<MyBets />} />                  
                  <Route exact path="/results" element={<Results />} />
                  <Route exact path="/profile" element={<Profile />} />
                </Route>
                <Route exact path="/select-game" element={<SelectDrawList />} />                 
                <Route exact path="/success/:id" element={<BetAccepted />} />
                <Route exact path="/deposit" element={<Deposit/>} />
                <Route exact path="/bet-details/:id" element={<SignUp />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
              
    </AuthProvider>
  );
}
