import React from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Authorizaton from "pages/AuthPages/Authorizaton";
import AdminLogin from "pages/AuthPages/AdminLogin";
import AdminProtectedRoutes from "./routes/AdminProtectedRoutes";
import WriterProtectedRoutes from "./routes/WriterProtectedRoutes";
import Languages from "pages/UserPages/Languages";
import User from "pages/AdminPages/User";
import Templates from "pages/AdminPages/Templates";
import AuthRoutes from "./routes/AuthRoutes";
import Stories from "pages/UserPages/Stories";
import StoryList from "pages/UserPages/Stories/StoryList";
import MasterStoriesList from "pages/UserPages/MasterStories";
import NotifyContextProvider from "context/NotifyContext";

const App = () => {

  return (
    <NotifyContextProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>

            {/* // Admin Protected Routes */}
            <Route element={<AdminProtectedRoutes />}>
              <Route path={"/admin_dashboard/users"} element={<User />} />
              <Route path={"/admin_dashboard/languages"} element={<Languages />} />
              <Route path={"/admin_dashboard/templates"} element={<Templates />} />
            </Route>

            {/* // Writer Protected Routes */}
            <Route element={<WriterProtectedRoutes />}>
              <Route path={"/stories"} element={<Stories />} />
              <Route path={"/stories/:id"} element={<StoryList />} />
              <Route path={"/master-stories"} >
                <Route index element={<MasterStoriesList />} />
                <Route path=":masterStoryId" element={<MasterStoriesList />} />
              </Route>
            </Route>

            <Route element={<AuthRoutes />}>
              <Route path={"/signup"} element={<Authorizaton />} />
              <Route path={"/login"} element={<Authorizaton login={true} />} />
              <Route path={"/admin_login"} element={<AdminLogin />} />

              <Route path="/*" element={<Navigate to="/login" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </NotifyContextProvider>
  );
};

export default App;
