// apps/frontend/src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Setup from "./pages/Setup";
import Loading from "./components/Loading";

// Hooks
import { useAuth } from "./hooks/useAuth";
import { useAppConfig } from "./hooks/useAppConfig";

import "./App.css";

/*  Landing Page
      Routing Logic:
      1. Check if app is initialized (has admin user + basic config)
        - If not initialized -> Setup page
      2. Check authentication status
        - If not logged in -> Login page  
      3. If logged in -> Dashboard (or specific room)

*/

function App() {


  return <></>;
}

export default App;
