// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import ShortestPathTool from "./components/ShortedPathTool";
import TelecomTopology from "./components/TelecomTopology";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login route */}
        <Route path="/" element={<Login />} />

        {/* Protected admin route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/shortest-path"
          element={
            <ProtectedRoute>
              <ShortestPathTool />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/topology"
          element={
            <ProtectedRoute>
              <TelecomTopology />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
export default App;
