import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'; // Ensure this component exists
import Signup from './components/Signup'; // Ensure this component exists
import Chat from './Chat'; // Ensure this component exists
import MoodTracker from './MoodTracker'; // New component for mood tracking
import Journaling from './Journaling'; // New component for journaling
import Profile from './Profile'; // New component for user profile management
import PrivateRoute from './PrivateRoute'; // Ensure this component exists for protected routes
import NotFound from './NotFound'; // Ensure this component exists for 404 pages

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
  path="/chat"
  element={
    <PrivateRoute element={<Chat />} />
  }
/>

        <Route
          path="/mood-tracker"
          element={
            <PrivateRoute>
              <MoodTracker />
            </PrivateRoute>
          }
        />
        <Route
          path="/journaling"
          element={
            <PrivateRoute>
              <Journaling />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
