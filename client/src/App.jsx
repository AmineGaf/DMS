import React, { useContext } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/Login";
import Contacts from "./pages/Contacts/Contacts";
import Projects from "./pages/projects/Projects";
import ForgetPassword from "./pages/Auth/components/ForgetPassword";
import ResetPassword from "./pages/Auth/components/ResetPassword";

import { AuthContext } from "./pages/Auth/contexts/AuthContext";
import NotFound from "./pages/not-found/NotFound";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Tasks from "./pages/Tasks/Tasks";
import TaskDetails from "./pages/Tasks/components/TaskDetails";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";

const RequireAuth = ({ children, requiredRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to={"/login"} />;

  if (!requiredRoles.includes(user.role)) {
    console.log("unauthorized");
    return;
  }
  return children;
};

const queryClient = new QueryClient();

const App = () => {
  const authRoutes = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/forget-password",
      element: <ForgetPassword />,
    },
    {
      path: "/reset-password/:token",
      element: <ResetPassword />,
    },
  ];

  const appRoutes = [
    {
      path: "/",
      element: <Dashboard />,
      requiredRoles: ["admin", "project Manager", "employee"],
    },
    {
      path: "/contacts",
      element: <Contacts />,
      requiredRoles: ["admin"],
    },
    {
      path: "/projects",
      element: <Projects />,
      requiredRoles: ["admin", "projectManager", "user"],
    },
    {
      path: "/tasks",
      element: <Tasks />,
      requiredRoles: ["admin", "projectManager", "user"],
    },
    {
      path: "/taskDetails/:id",
      element: <TaskDetails />,
      requiredRoles: ["admin", "projectManager", "user"],
    },
    {
      path:"profile/:fullname",
      element: <Profile />,
      requiredRoles: ["admin", "Project Manager", "employee"],
    },
    {
      path:"settings/:fullname",
      element: <Settings />,
      requiredRoles: ["admin", "Project Manager", "employee"],
    }
  ];

  const { user } = useContext(AuthContext);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <div className="flex">
            {user && <Sidebar />}
            <div className="w-full h-screen bg-background text-foreground">
              {user && <Navbar />}
              <Routes>
                {/* Authentification routes  */}
                {!user &&
                  authRoutes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  ))}

                {/* Private routes  */}
                {appRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <RequireAuth requiredRoles={route.requiredRoles}>
                        {route.element}
                      </RequireAuth>
                    }
                  />
                ))}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
