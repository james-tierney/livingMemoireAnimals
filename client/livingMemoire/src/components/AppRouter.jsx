// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Signup from './SignUp';
import UserProfile from './UserProfile';
import BatchQRGeneration from './BatchQRGeneration';
import ProfilePage from './temp/Profile';
import PrivateRoute from './PrivateRoute';
import Login from './Login';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/batchGeneration" element={<BatchQRGeneration />} />
        <Route 
          path="/userProfile"
          element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
          }
        />
        <Route 
          path="/profile"
          element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
