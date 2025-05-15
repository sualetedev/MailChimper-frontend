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
import { Audiences } from "../audience/Audience";
import { Campaign } from "../campaign/Campaign";
import { Contacts } from "../contact/Contacts";
import { UpdateTemplate } from "../template/UpdateTemplate";
import { CampaignStat } from "../campaign/CampaignStat";

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
          <Route path="audiences" element={<Audiences />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="logout" element={<Logout />} />
          <Route path="campaign" element={<Campaign />} />
          <Route path="editor/:id" element={<UpdateTemplate />} />
          <Route path="editor/" element={<UpdateTemplate />} />
          <Route path="campaignstats" element ={ <CampaignStat />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};
