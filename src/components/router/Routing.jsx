import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Login } from "../user/Login";
import { PublicLayout } from "../layout/public/PublicLayout";
import { Register } from "../user/Register";
import { Home } from "../layout/private/Home";
import { PrivateLayout } from "../layout/private/PrivateLayout";
import { Logout } from "../user/Logout";
import { AuthProvider } from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import { Audiencies } from "../audiencie/audiencies";
import { UpdateAudience } from "../audiencie/updateAudience";
import { Campaign } from "../campaign/Campaign";

export const Routing = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="*"
            element={
              <>
                <p>
                  <h1>404 Not Found</h1>
                  <Link to="/">Volver a inicio</Link>
                </p>
              </>
            }
          />
        </Route>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              {" "}
              <PrivateLayout />{" "}
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="audiences" element={<Audiencies />} />
          <Route path="updateaudience/:id" element={<UpdateAudience />} />
          <Route path="logout" element={<Logout />} />
          <Route path="campaign" element={<Campaign />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};
